import Presupuesto from "../models/Presupuesto";

const validacionExistenciaPresupuestoRelacion = async (req, res, next) => {
    try {
        const {presupuestoId} = req.body;
        const presupuestoToFound = await Presupuesto.findByPk(presupuestoId);
        if (!presupuestoToFound) {
            return res.status(409).json({
                error: `El presupuesto con el id ${presupuestoId} no fue encontrado`
            });
        }
        next();
    } catch (e) {
        return res.status(500).json({
            error: "Error en la busqueda de presupuesto",
            message: e.message
        });
    }
}

export {
    validacionExistenciaPresupuestoRelacion
}