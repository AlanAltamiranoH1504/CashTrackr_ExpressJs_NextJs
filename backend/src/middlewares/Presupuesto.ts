import Presupuesto from "../models/Presupuesto";


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