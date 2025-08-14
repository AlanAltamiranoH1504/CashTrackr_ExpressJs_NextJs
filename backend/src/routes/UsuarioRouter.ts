import express from "express";
const router = express.Router();
import {
    checkPassword,
    prueba,
    reestablecerPassword,
    save,
    updateInformacionUsuario
} from "../controllers/UsuarioController";
import {
    checkPasswordRequest,
    resetPasswordRequest,
    saveUsuarioRequest,
    UpdateInformacionUsuarioRequest
} from "../validators/UsuarioValidator";
import {usuarioEnSesionMiddleware, validacionEmailYaRegistrado} from "../middlewares/Usuario";

router.get("/prueba", prueba)
router.post("", saveUsuarioRequest, validacionEmailYaRegistrado, save);
router.put("/reset-password", usuarioEnSesionMiddleware, resetPasswordRequest, reestablecerPassword);
router.post("/check-password", usuarioEnSesionMiddleware, checkPasswordRequest, checkPassword);
router.put("/reset-data-user", usuarioEnSesionMiddleware, UpdateInformacionUsuarioRequest, updateInformacionUsuario);

export default router;