import Presupuesto from "../models/Presupuesto";
import {UsuarioEnSesion} from "../types";
import presupuesto from "../models/Presupuesto";

export const validacionExistenciaPresupuesto = async (req, res, next) => {
    try {
        const {id} = req.params;
        const presupuestoToFound = await Presupuesto.findByPk(id);
        if (!presupuestoToFound) {
            return res.status(404).json({
                error: `Presupuesto con id: ${id} no encontrado`
            });
        }
        next();
    }catch (e) {
        return res.status(500).json({
            error: "Error en busqueda de presupuesto",
            message: e.message
        });
    }
}

export const validacionPropietarioPresupuesto = async (req, res, next) => {
    try {
        const {id} = req.params;
        const userInSesion: UsuarioEnSesion = req.usuario;

        //Busqueda de presupuesto
        const presupuestoToShow = await Presupuesto.findByPk(id);
        if (presupuestoToShow.usuarioId !== userInSesion.id) {
            return res.status(401).json({
                error: "Acceso no autorizado"
            });
        }
        next();
    }catch (e) {
        return res.status(500).json({
            error: "Error en la busqueda de presupuesto",
            message: e.message
        });
    }
}