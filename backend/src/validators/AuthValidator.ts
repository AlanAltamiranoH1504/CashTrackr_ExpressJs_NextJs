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

export {
    requestConfirmedUserAccount
}