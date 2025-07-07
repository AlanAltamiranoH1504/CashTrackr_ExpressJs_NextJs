import express from "express";
import {deleteById, findAll, findById, prueba, save, update, findByPresupuestoId} from "../controllers/GastoController"
import {findByIdRequest, saveGasto, updateGastoRequest} from "../validators/GastosValidator";
import {validacionExistenciaPresupuestoRelacion} from "../middlewares/Gasto";
const router = express.Router();

router.get("/prueba", prueba);
router.get("", findAll);
router.get("/presupuesto/:idPresupuesto", validacionExistenciaPresupuestoRelacion, findByPresupuestoId);
router.get("/:id", findByIdRequest, findById);
router.post("", saveGasto, validacionExistenciaPresupuestoRelacion, save);
router.put("/:id", findByIdRequest, validacionExistenciaPresupuestoRelacion, updateGastoRequest, update);
router.delete("/:id", findByIdRequest, deleteById);
export default router;