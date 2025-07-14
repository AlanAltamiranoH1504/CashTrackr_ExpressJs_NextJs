import express from "express";
const router = express.Router();
import {confirmacionCuenta, loginUsuario, prueba} from "../controllers/AuthController"
import {requestConfirmedUserAccount, requestLogin} from "../validators/AuthValidator";

router.get("/prueba", prueba)
router.post("/confirmar/:token", requestConfirmedUserAccount, confirmacionCuenta);
router.post("/login", requestLogin, loginUsuario);

export default router;