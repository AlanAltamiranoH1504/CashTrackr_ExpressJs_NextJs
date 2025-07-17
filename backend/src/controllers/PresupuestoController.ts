import Presupuesto from "../models/Presupuesto";
import Gasto from "../models/Gasto";
import {UsuarioEnSesion} from "../types";

const prueba = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando controladr de presupuestos"
    });
}

const findAll = async (req, res) => {
    try {
        const usuarioInSesion: UsuarioEnSesion = req.usuario;
        const presupuestos = await Presupuesto.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
            where: {
                usuarioId: usuarioInSesion.id
            }
        });
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
        const presupuestoToFound = await Presupuesto.findOne({
            where: {
                id: id
            },
            include: [
                {model: Gasto, attributes: ["id", "nombre", "monto", "updatedAt"]}],
        });
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
    try {
        const {nombre, monto} = req.body;
        const usuarioInSesion: UsuarioEnSesion = req.usuario;
        const presupuestoToSave: Presupuesto = await Presupuesto.create({
            nombre: nombre,
            monto: monto,
            usuarioId: usuarioInSesion.id
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