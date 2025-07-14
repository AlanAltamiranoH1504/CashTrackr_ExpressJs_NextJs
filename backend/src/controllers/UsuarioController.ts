import Usuario from "../models/Usuario";
import bcrypt = require("bcrypt");
import {v4 as uuidv4} from "uuid";
import {emailConfirmacionCuenta} from "../helpers/Emails";
import {ConfirmacionCuentaUsuario} from "../types";

const prueba = (req, res) => {
    return res.status(200).json({
        success: "Funcionando usuario controller"
    });
}

const save = async (req, res) => {
    try {
        const {nombre, apellidos, email, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const userToRegiter = await Usuario.create({
            nombre,
            apellidos,
            email,
            password: passwordHash,
            token: uuidv4(),
        });
        const datos: ConfirmacionCuentaUsuario = {
            nombre,
            email,
            token: userToRegiter.token
        }
        await emailConfirmacionCuenta(datos);
        return res.status(201).json({
            success: "Confirma tu cuenta en tu email",
        })
    }catch (e) {
        return res.status(500).json({
            error: "Error en el registro de usuario",
            message: e.message
        });
    }
}

export {
    prueba,
    save
}