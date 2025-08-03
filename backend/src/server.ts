import express from "express";
import conexion from "./config/db";
import PresupuestoRouter from "./routes/PresupuestoRouter";
import GastoRouter from "./routes/GastoRouter";
import UsuarioRouter from "./routes/UsuarioRouter";
import AuthRouter from "./routes/AuthRouter";
import {limiter} from "./config/limiter";
import {corsConfig} from "./config/cors";
import cors from "cors";

const app = express();
app.use(express.json());
conexion.authenticate().then(() => {
    console.log("Conexion correcta a la base de datos");
});
//Limite de peticiones global
// app.use(limiter);

//Habilitacion de CORS
app.use(cors(corsConfig));

app.use("/presupuestos", PresupuestoRouter);
app.use("/gastos", GastoRouter);
app.use("/usuarios", UsuarioRouter);
app.use("/auth", limiter, AuthRouter);
export default app;