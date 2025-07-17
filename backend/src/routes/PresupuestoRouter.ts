import express from "express";
import {deleteById, findAll, findById, prueba, save, update} from "../controllers/PresupuestoController";
import {findByIdPresupuesto, savePresupuesto, updatePresupuesto} from "../validators/PresupuestoValidators";
import {usuarioEnSesionMiddleware} from "../middlewares/Usuario";
import {validacionPropietarioPresupuesto} from "../middlewares/Presupuesto";
const router = express.Router();

router.get("/", usuarioEnSesionMiddleware, findAll);
router.get("/:id", usuarioEnSesionMiddleware, validacionPropietarioPresupuesto, findByIdPresupuesto, findById);
router.post("/", usuarioEnSesionMiddleware, savePresupuesto, save);
router.put("/:id",usuarioEnSesionMiddleware, validacionPropietarioPresupuesto, updatePresupuesto, update);
router.delete("/:id", usuarioEnSesionMiddleware, validacionPropietarioPresupuesto, findByIdPresupuesto, deleteById);
export default router;