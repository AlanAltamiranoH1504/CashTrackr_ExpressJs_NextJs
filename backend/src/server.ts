import express from "express";
import conexion from "./config/db";
import PresupuestoRouter from "./routes/PresupuestoRouter";
import GastoRouter from "./routes/GastoRouter";
import UsuarioRouter from "./routes/UsuarioRouter";

const app = express();
app.use(express.json());
conexion.authenticate().then(() => {
    console.log("Conexion correcta a la base de datos");
});
app.use("/presupuestos", PresupuestoRouter);
app.use("/gastos", GastoRouter);
app.use("/usuarios", UsuarioRouter);
export default app;