import express from "express";
const router = express.Router();
import {
    confirmacionCuenta,
    confirmarNuevaPassword,
    loginUsuario,
    olvidePassword,
    prueba
} from "../controllers/AuthController"
import {
    requestConfirmedUserAccount,
    requestLogin,
    requestOlvidePassword,
    requestResetPassword
} from "../validators/AuthValidator";

router.get("/prueba", prueba)
router.post("/confirmar/:token", requestConfirmedUserAccount, confirmacionCuenta);
router.post("/login", requestLogin, loginUsuario);
router.post("/olvide-password", requestOlvidePassword, olvidePassword);
router.post("/validacion-nueva-password", requestResetPassword, confirmarNuevaPassword);

export default router;