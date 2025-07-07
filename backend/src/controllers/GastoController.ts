import Gasto from "../models/Gasto";

const prueba = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando gasto controller"
    });
}

const findAll = async (req, res) => {
    try {
        const gastosToList = await Gasto.findAll();
        if (gastosToList.length <= 0) {
            return res.status(404).json({
                error: "No se encontraron gastos disponibles"
            });
        }
        return res.status(200).json(gastosToList);
    } catch (e) {
        return res.status(500).json({
            error: "Error en busqueda de gastos",
            message: e.message
        });
    }
}

const findByPresupuestoId = async (req, res) => {
    try {
        const {idPresupuesto} = req.params;
        const gastos = await Gasto.findAll({
            where: {
                presupuestoId: idPresupuesto
            }
        });
        if (gastos.length <= 0) {
            return res.status(404).json({
                error: `No se encontraron gastos disponibles para el presupuesto con id ${idPresupuesto}`
            });
        }
        return res.status(200).json(gastos);
    }catch (e) {
        return res.status(500).json({
            error: "Error en busqueda de gastos del presupuesto",
            message: e.message
        });
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params;
        const gastoToShow = await Gasto.findByPk(id);
        if (!gastoToShow) {
            return res.status(404).json({
                error: `Gasto con id ${id} no existente`
            });
        }
        return res.status(200).json(gastoToShow);
    } catch (e) {
        return res.status(500).json({
            error: "Error en busqueda de gasto",
            message: e.message
        });
    }
}

const save = async (req, res) => {
    try {
        const {nombre, monto, presupuestoId} = req.body;
        const gastoToSave = await Gasto.create({
            nombre,
            monto,
            presupuestoId,
        });
        return res.status(201).json({
            success: "Gasto guardado correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            error: "Error en la creacion de gasto",
            message: e.message
        });
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, monto, presupuestoId} = req.body;

        const gastoToUpdate = await Gasto.findByPk(id);
        if (!gastoToUpdate) {
            return res.status(404).json({
                error: `Gasto con id ${id} no existente`
            });
        }
        await gastoToUpdate.update({
            nombre,
            monto,
            presupuestoId
        });
        return res.status(200).json({
            success: "Gasto actualizado correctamente"
        })
    } catch (e) {
        return res.status(500).json({
            error: "Error en la actualizacion de gasto",
            message: e.message
        });
    }
}

const deleteById = async (req, res) => {
    try {
        const {id} = req.params;
        const gastoToDelete = await Gasto.findByPk(id);
        if (!gastoToDelete) {
            return res.status(404).json({
                error: `Gasto con id ${id} no existente`
            });
        }
        await gastoToDelete.destroy();
        return res.status(200).json({
            success: "Gasto eliminado correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            error: "Error en eliminacion de gasto",
            message: e.message
        });
    }
}

export {
    prueba,
    findAll,
    findById,
    findByPresupuestoId,
    save,
    update,
    deleteById
}