import {createRequest, createResponse} from "node-mocks-http";
import {Presupuestos} from "../mocks/Presupuestos";
import {findAll, findById, save} from "../../controllers/PresupuestoController";
import Presupuesto from "../../models/Presupuesto";
import {update} from "../../controllers/GastoController";
// import {findById} from "../../controllers/GastoController";

jest.mock("../../models/Presupuesto", () => ({
    __esModule: true,
    default: {
        findAll: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByPk: jest.fn(),
        findOne: jest.fn(),
    }
}));
jest.mock("../../models/Gasto", () => ({
    __esModule: true,
    default: {} // 👈 no necesitas funciones si no las vas a llamar directamente
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

describe("PresupuestoController.findById", () => {
    beforeEach(() => {
        (Presupuesto.findOne as jest.Mock).mockImplementation(({ where }) => {
            const presupuesto = Presupuestos.find(p => p.id === Number(where.id));
            return Promise.resolve({
                ...presupuesto,
                Gasto: []
            });
        });
    });

    test("Prueba para busqueda de presupuesto por id", async () => {
        const req = createRequest({
            method: "GET",
            url: "/presupuestos/1",
            params: { id: "1" }
        });
        const res = createResponse();
        await findById(req, res);
        const data = res._getJSONData();
        expect(data.presupuesto).not.toBeNull();
        expect(res.statusCode).toBe(200);
    });

    test("Prueba para error en busqueda de presupuesto por id", async () => {
        const req = createRequest({
            method: "GET",
            url: "/presupuestos/1",
            params: { id: "9" }
        });
        const res = createResponse();
        await findById(req, res);
        const data = res._getJSONData();
        console.log(data)
    })
});

describe("PresupuestoController.update", () => {
    test("Prueba para actualización de presupuesto por id", async () => {
        const saveMock = jest.fn().mockResolvedValue(true);

        // Simula que se encontró el presupuesto y se puede modificar
        (Presupuesto.findByPk as jest.Mock).mockResolvedValue({
            id: 1,
            nombre: "Presupuesto Original",
            monto: 1000,
            save: saveMock
        });

        const req = createRequest({
            method: "PUT",
            url: "/presupuestos/1",
            params: { id: "1" },
            body: {
                nombre: "Presupuesto Actualizado",
                monto: 2000
            }
        });

        const res = createResponse();

        await update(req, res);

        const data = res._getJSONData();

        // expect(Presupuesto.findByPk).toHaveBeenCalledWith("1");
        expect(saveMock).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
        expect(data.msg).toBe("Presupuesto actualizado correctamente.");
    });
});

