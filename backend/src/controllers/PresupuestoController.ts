import {validationResult} from "express-validator";

const prueba = (req, res) => {
    return res.status(200).json({
        msg: "Funcionando controladr de presupuestos"
    });
}

const findAll = (req, res) => {
    return res.status(200).json({
        msg: "FindAll"
    });
}

const findById = (req, res) => {
    return res.status(200).json({
        msg: "FindById"
    });
}

const save = (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(409).json({
            errores: errores.array()
        });
    }

    return res.status(201).json({
        msg: "Save"
    });
}

const update = (req, res) => {
    return res.status(200).json({
        msg: "Update"
    });
}

const deleteById = (req, res) => {
    return res.status(200).json({
        msg: "Delete by id"
    });
}
export {
    prueba,
    findAll,
    findById,
    save,
    update,
    deleteById
}