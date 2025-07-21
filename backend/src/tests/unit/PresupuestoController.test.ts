import {createRequest, createResponse} from "node-mocks-http";
import {Presupuestos} from "../mocks/Presupuestos";
import {findAll, save} from "../../controllers/PresupuestoController";
import Presupuesto from "../../models/Presupuesto";

jest.mock("../../models/Presupuesto", () => ({
    __esModule: true,
    default: {
        findAll: jest.fn(),
        create: jest.fn()
    }
}));

describe("PresupuestoController.findAll", () => {
    beforeEach(() => {
        (Presupuesto.findAll as jest.Mock).mockReset();
        (Presupuesto.findAll as jest.Mock).mockImplementation((options) => {
            const presupuestosFiltro = Presupuestos.filter(presupuesto => presupuesto.usuarioId === options.where.usuarioId);
            return Promise.resolve(presupuestosFiltro);
        });
    })

    test("Debe devolver 3 presupuestos del archivo de pruebas de presupuestos", () => {
        //Se espera que los budgets sean 3 elementos
        expect(Presupuestos).toHaveLength(3);
        expect(Presupuestos).not.toHaveLength(0);
        expect(Presupuestos).not.toBeNull();
    });

    test("Debe traer los presupuestos segun una condicion por usuarioId", async () => {
        const req = createRequest({
            method: "GET",
            url: "/presupuestos",
            usuario: {id: 1}
        });
        const res = createResponse();
        // const presupuestosFiltro  = Presupuestos.filter(presupuesto => presupuesto.usuarioId === req.usuario.id);
        // (Presupuesto.findAll as jest.Mock).mockResolvedValue(presupuestosFiltro)
        await findAll(req, res);

        const data = res._getJSONData();
        expect(data).toHaveLength(2);
        expect(res.statusCode).toBe(200);
    });

    test("Prueba para consulta de presupuesto por usuarioId igual a 2", async () => {
        const req = createRequest({
            method: "GET",
            url: "/presupuestos",
            usuario: {id: 2}
        });
        const res = createResponse();
        const presupuestosFiltro = Presupuestos.filter((presupuesto) => {
            return presupuesto.usuarioId === req.usuario.id;
        });
        (Presupuesto.findAll as jest.Mock).mockResolvedValue(presupuestosFiltro);
        await findAll(req, res);

        const data = res._getJSONData();
        expect(data).toHaveLength(1);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    });

    test("Prueba para estado 404 por usuarioId no existente en mock", async () => {
        const req = createRequest({
            method: "GET",
            url: "/presupuestos",
            usuario: {id: 3}
        });
        const res = createResponse();
        const presupuestoFiltro = Presupuestos.filter((presupuesto) => {
            return presupuesto.usuarioId === req.usuario.id;
        });
        (Presupuesto.findAll as jest.Mock).mockResolvedValue(presupuestoFiltro);
        await findAll(req, res);

        const data = res._getJSONData();
        expect(res.statusCode).toBe(404);
    });
});

describe("PresupuestoController.save", () => {
    test("Prueba para la creacion y almacenamiento de un presupuesto", async () => {
        const mockPresupuesto = {
            save: jest.fn().mockResolvedValue(true)
        };
        (Presupuesto.create as jest.Mock).mockResolvedValue(mockPresupuesto);
        const req = createRequest({
            method: "POST",
            url: "/presupuestos",
            usuario: {id: 3},
            body: {
                nombre: "Presupuesto prueba",
                monto: 2000
            }
        });
        const res = createResponse();
        await save(req, res);
        const data = res._getJSONData();

        expect(res.statusCode).toBe(201);
        expect(data.msg).toBe("Presupuesto guardado correctamente.");
    });

    test("Prueba de error en la creacion y almacenamiento de un presupuesto", async () => {

        (Presupuesto.create as jest.Mock).mockRejectedValue(new Error);
        const req = createRequest({
            method: "POST",
            url: "/presupuestos",
            usuario: {id: 3},
        });
        const res = createResponse();
        await  save(req, res);
        const data = res._getJSONData();
        expect(res.statusCode).toBe(500);
        expect(data.error).toBe("Error en creación de presupuesto.");
    });
});