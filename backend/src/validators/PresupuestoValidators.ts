import {body, ValidationChain} from "express-validator";

const savePresupuesto: ValidationChain[] = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({max: 100, min: 5}).withMessage("La longitud del nombre debe ser entre 5 y 100 caracteres"),
    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isFloat().withMessage("El monto debe ser un numero entero o con decimales")
];

const updatePresupuesto: ValidationChain[] = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({min: 5, max: 100}).withMessage("La longitud del nombre debe ser entre 5 y 100 caracteres"),
    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isFloat().withMessage("El monto debe ser un numero entero o con decimales")
];
export {
    savePresupuesto,
    updatePresupuesto
}