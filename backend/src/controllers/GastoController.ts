import Gasto from "../models/Gasto";

const prueba = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando gasto controller"
    });
}

const findAll = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando gasto controller findAll"
    });
}

const findById = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando gasto controller findById"
    })
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
    }catch (e) {
        return res.status(500).json({
            error: "Error en la creacion de gasto",
            message: e.message
        });
    }
}

const update = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando gasto controller update"
    })
}

const deleteById = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando gasto controller deletebyId"
    })
}

export {
    prueba,
    findAll,
    findById,
    save,
    update,
    deleteById
}