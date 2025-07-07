import {body, param, ValidationChain, validationResult} from "express-validator";

const savePresupuesto = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({max: 100, min: 5}).withMessage("La longitud del nombre debe ser entre 5 y 100 caracteres"),
    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isFloat({min: 1}).withMessage("El monto debe ser un numero entero o con decimales"),

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

const findByIdPresupuesto = [
    param("id")
        .notEmpty().withMessage("El id de busqueda es obligatorio")
        .isInt().withMessage("El id de busqueda debe ser un numero entero")
        .custom(value => value > 0).withMessage("El id de busqueda debe ser mayor a 0"),

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

const updatePresupuesto = [
    param("id")
        .notEmpty().withMessage("El id de busqueda es obligatorio")
        .isInt().withMessage("El id de busqueda debe ser un numero entero")
        .custom(value => value > 0).withMessage("El id de busqueda debe ser mayor a 0"),
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({min: 5, max: 100}).withMessage("La longitud del nombre debe ser entre 5 y 100 caracteres"),
    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isFloat().withMessage("El monto debe ser un numero entero o con decimales"),

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
    findByIdPresupuesto,
    savePresupuesto,
    updatePresupuesto
}