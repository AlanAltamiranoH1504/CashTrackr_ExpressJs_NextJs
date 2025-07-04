import {Result, validationResult} from "express-validator";
import Presupuesto from "../models/Presupuesto";

const prueba = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando controladr de presupuestos"
    });
}

const findAll = async (req, res) => {
    try {
        const presupuestos = await Presupuesto.findAll();
        if (presupuestos.length <= 0) {
            return res.status(404).json({
                error: "No hay presupuestos disponibles"
            });
        }
        return res.status(200).json(presupuestos);
    }catch (e) {
        return res.status(500).json({
            error: "Error en listado de presupuestos.",
            msg: e.message
        });
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params;
        const presupuestoToFound = await Presupuesto.findByPk(id);
        if (!presupuestoToFound) {
            return res.status(404).json({
                error: "Presupuesto no encontrado"
            });
        }
        return res.status(200).json({
            presupuesto: presupuestoToFound
        });
    }catch (e) {
        return res.status(500).json({
            error: "Error en busqueda de presupuesto",
            msg: e.message
        });
    }
}

const save = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(409).json({
            errores: errores.array()
        });
    }
    try {
        const {nombre, monto} = req.body;
        const presupuestoToSave = await Presupuesto.create({
            nombre: nombre,
            monto: monto,
        });
        return res.status(201).json({
            msg: "Presupuesto guardado correctamente.",
        });
    }catch (e) {
        return res.status(500).json({
            error: "Error en creación de presupuesto.",
            msg: e.message
        });
    }
}

const update = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(409).json({
            errores: errores.array()
        });
    }

    try {
        const {id} = req.params;
        const {nombre, monto} = req.body;
        const presupuestoToUpate = await Presupuesto.findByPk(id);
        if(!presupuestoToUpate) {
            return res.status(404).json({
                error: "Presupuesto no encontrado"
            });
        }
        presupuestoToUpate.nombre = nombre;
        presupuestoToUpate.monto = monto;
        await presupuestoToUpate.save();

        return res.status(200).json({
            msg: "´Presupuesto actualizado correctamente.",
        })
    }catch (e) {
        return res.status(500).json({
            error: "Error en actualizacion de presupuesto",
            msg: e.message
        })
    }
}

const deleteById = async (req, res) => {
    try {
        const {id} = req.params;
        const presupuestoToDelete = await Presupuesto.findByPk(id);
        if (!presupuestoToDelete) {
            return res.status(404).json({
                error: "Presupuesto no encontrado"
            });
        }
        await presupuestoToDelete.destroy();
        return res.status(200).json({
            msg: "Presupuesto eliminado correctamente"
        });
    }catch (e) {
        return res.status(500).json({
            error: "Error en eliminacion de presupuesto",
            msg: e.message
        });
    }
}
export {
    prueba,
    findAll,
    findById,
    save,
    update,
    deleteById
}