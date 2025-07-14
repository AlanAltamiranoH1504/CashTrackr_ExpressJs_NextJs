import express from "express";
import conexion from "./config/db";
import PresupuestoRouter from "./routes/PresupuestoRouter";
import GastoRouter from "./routes/GastoRouter";
import UsuarioRouter from "./routes/UsuarioRouter";
import AuthRouter from "./routes/AuthRouter";
import {limiter} from "./config/limiter";

const app = express();
app.use(express.json());
conexion.authenticate().then(() => {
    console.log("Conexion correcta a la base de datos");
});
//Limite de peticiones global
// app.use(limiter);

app.use("/presupuestos", PresupuestoRouter);
app.use("/gastos", GastoRouter);
app.use("/usuarios", UsuarioRouter);
app.use("/auth", limiter, AuthRouter);
export default app;