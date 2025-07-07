import express from "express";
import {deleteById, findAll, findById, prueba, save, update} from "../controllers/PresupuestoController";
import {findByIdPresupuesto, savePresupuesto, updatePresupuesto} from "../validators/PresupuestoValidators";
const router = express.Router();

router.get("/", findAll);
router.get("/:id", findByIdPresupuesto, findById);
router.post("/", savePresupuesto, save);
router.put("/:id", updatePresupuesto, update);
router.delete("/:id", findByIdPresupuesto, deleteById);
export default router;