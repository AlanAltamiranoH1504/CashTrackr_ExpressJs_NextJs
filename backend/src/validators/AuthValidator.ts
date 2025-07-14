import {body, validationResult} from "express-validator";

const requestConfirmedUserAccount = [
    body("tokenRequest")
        .notEmpty().withMessage("El token de confirmacion se encuentra corrupto")
        .isString().withMessage("El token de confirmacion se encuentra corrupto"),

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

const requestLogin = [
    body("email")
        .notEmpty().withMessage("El e-mail es obligatorio")
        .isEmail().withMessage("El formato del e-mail no es el correcto"),
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
];

const requestOlvidePassword = [
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("El formato del e-mail no es el correcto"),

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

const requestResetPassword = [
    body("token")
        .notEmpty().withMessage("Token de reestablecimiento corrupto")
        .isString().withMessage("Token de reestablecimiento corrupto"),
    body("password")
        .notEmpty().withMessage("El password es obligatorio")
        .isLength({min: 6}).withMessage("El password debe tener al menos 6 caracteres"),

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
    requestConfirmedUserAccount,
    requestLogin,
    requestOlvidePassword,
    requestResetPassword
}