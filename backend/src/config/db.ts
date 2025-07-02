import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const conexion = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: "mysql",
    define: {
        timestamps: true
    }
});
export default conexion;