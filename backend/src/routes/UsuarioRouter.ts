import express from "express";
const router = express.Router();
import {prueba, save} from "../controllers/UsuarioController";
import {saveUsuarioRequest} from "../validators/UsuarioValidator";
import {validacionEmailYaRegistrado} from "../middlewares/Usuario";

router.get("/prueba", prueba)
router.post("", saveUsuarioRequest, validacionEmailYaRegistrado, save);

export default router;