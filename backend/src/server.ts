import express from "express";
import conexion from "./config/db";

const app = express();
app.use(express.json());
conexion.authenticate().then(() => {
    console.log("Conexion correcta a la base de datos");
});
export default app;