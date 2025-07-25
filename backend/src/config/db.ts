import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv";
import Presupuesto from "../models/Presupuesto";
import Gasto from "../models/Gasto";
import Usuario from "../models/Usuario";
dotenv.config();

const conexion = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [Presupuesto, Gasto, Usuario],
    define: {
        timestamps: true
    },
    logging: false
})

export default conexion;