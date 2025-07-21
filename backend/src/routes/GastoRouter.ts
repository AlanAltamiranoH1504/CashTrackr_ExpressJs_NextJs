import express from "express";
import {deleteById, findAll, findById, prueba, save, update, findByPresupuestoId} from "../controllers/GastoController"
import {findByIdRequest, saveGasto, updateGastoRequest} from "../validators/GastosValidator";
import {validacionExistenciaPresupuestoRelacion} from "../middlewares/Gasto";
import {usuarioEnSesionMiddleware} from "../middlewares/Usuario";
const router = express.Router();

router.get("/prueba", prueba);
router.get("", usuarioEnSesionMiddleware, findAll);
router.get("/presupuesto/:idPresupuesto", usuarioEnSesionMiddleware, validacionExistenciaPresupuestoRelacion, findByPresupuestoId);
router.get("/:id", usuarioEnSesionMiddleware, findByIdRequest, findById);
router.post("", usuarioEnSesionMiddleware, saveGasto, validacionExistenciaPresupuestoRelacion, save);
router.put("/:id", usuarioEnSesionMiddleware, findByIdRequest, validacionExistenciaPresupuestoRelacion, updateGastoRequest, update);
router.delete("/:id", usuarioEnSesionMiddleware, findByIdRequest, deleteById);
export default router;