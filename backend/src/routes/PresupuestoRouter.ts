import express from "express";
import {deleteById, findAll, findById, prueba, save, update} from "../controllers/PresupuestoController";
import {savePresupuesto, updatePresupuesto} from "../validators/PresupuestoValidators";
const router = express.Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", savePresupuesto, save);
router.put("/:id", updatePresupuesto, update);
router.delete("/:id", deleteById);
export default router;