import {body} from "express-validator";

const savePresupuesto = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({max: 100, min: 5}).withMessage("La longitud del nombre debe ser entre 5 y 100 caracteres"),
    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isFloat().withMessage("El monto debe ser un numero entero o con decimales")
];

export {
    savePresupuesto
}