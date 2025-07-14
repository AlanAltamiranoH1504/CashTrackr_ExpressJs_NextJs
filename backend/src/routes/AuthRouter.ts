import express from "express";
const router = express.Router();

import {confirmacionCuenta, prueba} from "../controllers/AuthController"
import {requestConfirmedUserAccount} from "../validators/AuthValidator";


router.get("/prueba", prueba)
router.post("/confirmar/:token", requestConfirmedUserAccount, confirmacionCuenta);

export default router;