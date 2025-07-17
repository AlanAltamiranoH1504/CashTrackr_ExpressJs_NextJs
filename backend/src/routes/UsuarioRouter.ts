import express from "express";
const router = express.Router();
import {prueba, reestablecerPassword, save} from "../controllers/UsuarioController";
import {resetPasswordRequest, saveUsuarioRequest} from "../validators/UsuarioValidator";
import {usuarioEnSesionMiddleware, validacionEmailYaRegistrado} from "../middlewares/Usuario";

router.get("/prueba", prueba)
router.post("", saveUsuarioRequest, validacionEmailYaRegistrado, save);
router.put("/reset-password", usuarioEnSesionMiddleware, resetPasswordRequest, reestablecerPassword);

export default router;