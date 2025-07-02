import express from "express";
import conexion from "./config/db";
import PresupuestoRouter from "./routes/PresupuestoRouter";

const app = express();
app.use(express.json());
conexion.authenticate().then(() => {
    console.log("Conexion correcta a la base de datos");
});
app.use("/presupuestos", PresupuestoRouter);
export default app;