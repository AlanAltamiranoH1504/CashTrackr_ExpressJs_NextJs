import {body, param, validationResult} from "express-validator";

const saveGasto = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({min: 3, max: 100}).withMessage("La longitud del nombre debe ser entre 3 y 100 caracteres"),
    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isFloat({min: 1}).withMessage("El monto debe ser un numero entero o decimal mayor a 0"),
    body("presupuestoId")
        .notEmpty().withMessage("El presupuesto con el que tiene relacion es obligatorio")
        .isInt({min: 1}).withMessage("El id del presupuesto debe ser un numero entero mayor a 0"),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json({
                errores: errores.array()
            });
        }
        next();
    }
];

const findByIdRequest = [
    param("id")
        .notEmpty().withMessage("El id de busqueda es obligatorio")
        .isInt({min: 1}).withMessage("El id de busqueda debe ser un numero entero mayor a 0"),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json({
                errores: errores.array()
            });
        }
        next();
    }
]
const updateGastoRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({min: 3, max: 100}).withMessage("La longitud del nombre debe ser entre 3 y 100 caracteres"),
    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isFloat({min: 1}).withMessage("El monto debe ser un numero entero o decimal mayor a 0"),
    body("presupuestoId")
        .notEmpty().withMessage("El presupuesto con el que tiene relacion es obligatorio")
        .isInt({min: 1}).withMessage("El id del presupuesto debe ser un numero entero mayor a 0"),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json({
                errores: errores.array()
            });
        }
        next();
    }
];

export {
    saveGasto,
    findByIdRequest,
    updateGastoRequest
}