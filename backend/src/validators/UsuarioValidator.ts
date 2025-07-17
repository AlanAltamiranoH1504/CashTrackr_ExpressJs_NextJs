import {body, validationResult} from "express-validator";

const saveUsuarioRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({min: 3, max: 50}).withMessage("La longitud del nombre es entre 3 y 50 caracteres"),
    body("apellidos")
        .notEmpty().withMessage("Los apellidos son obligatorios")
        .isLength({min: 3, max: 100}).withMessage("La longitud del nombre es entre 3 y 100 caracteres"),
    body("email")
        .notEmpty().withMessage("El email de es obligatorio")
        .isEmail().withMessage("El email debe tener el formato correcto"),
    body("password")
        .notEmpty().withMessage("El password es obligatorio")
        .isLength({min: 5}).withMessage("El password debe tener al menos 5 caracteres"),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json({
                errores: errores.array()
            })
        }
        next();
    }
];

const resetPasswordRequest = [
    body("passwordOld")
        .notEmpty().withMessage("El password actual es obligatoria"),
    body("newPassword")
        .notEmpty().withMessage("El nuevo password es obligatorio")
        .isLength({min: 5}).withMessage("El password nuevo debe tener al menos 5 caracteres"),


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

const checkPasswordRequest = [
    body("password")
        .notEmpty().withMessage("El password es obligatorio"),

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

export {
    saveUsuarioRequest,
    resetPasswordRequest,
    checkPasswordRequest
}