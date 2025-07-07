import express from "express";
import {deleteById, findAll, findById, prueba, save, update} from "../controllers/GastoController"
import {saveGasto} from "../validators/GastosValidator";
import {validacionExistenciaPresupuesto} from "../middlewares/Presupuesto";
import {validacionExistenciaPresupuestoRelacion} from "../middlewares/Gasto";
const router = express.Router();

router.get("/prueba", prueba);
router.get("", findAll);
router.get("/:id", findById);
router.post("", saveGasto, validacionExistenciaPresupuestoRelacion, save);
router.put("/:id", update);
router.delete("/:id", deleteById);
export default router;