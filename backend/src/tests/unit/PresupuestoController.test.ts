import {createRequest, createResponse} from "node-mocks-http";
import {Presupuestos} from "../mocks/Presupuestos";
import {findAll} from "../../controllers/PresupuestoController";
import Presupuesto from "../../models/Presupuesto";

jest.mock("../../models/Presupuesto", () => ({
    __esModule: true,
    default: {
        findAll: jest.fn()
    }
}));

describe("PresupuestoController.findAll", () => {
    beforeEach(() => {
        (Presupuesto.findAll as jest.Mock).mockReset();
        (Presupuesto.findAll as jest.Mock).mockImplementation((options) => {
            const presupuestosFiltro  = Presupuestos.filter(presupuesto => presupuesto.usuarioId === options.where.usuarioId);
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
        const presupuestosFiltro = Presupuestos.filter((presupuesto) =>{
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