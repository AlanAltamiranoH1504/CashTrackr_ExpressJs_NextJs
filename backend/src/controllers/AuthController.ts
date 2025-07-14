import bcrypt = require("bcrypt");
import Usuario from "../models/Usuario";
import {LoginUsuario} from "../types";
import {generateJWT} from "../helpers/JWT";

const prueba = (req, res) => {
    return res.status(200).json({
        msg: "Funciondo AuthController"
    });
}

const confirmacionCuenta = async (req, res) => {
    const token: string = req.params.token;
    const {tokenRequest} = req.body;
    try {
        //Busqueda de usuario con ese token
        const userToConfirmed = await Usuario.findOne({
            where: {
                token: tokenRequest
            }
        });
        if (!userToConfirmed) {
            return res.status(404).json({
                error: "Usuario para confirmacion no encontrado"
            });
        }
        //Confirmacion de usaurio
        userToConfirmed.confirmado = true;
        userToConfirmed.token = null;
        await userToConfirmed.save();
        return res.status(200).json({
            success: "Cuenta confirmada correctamente"
        });
    }catch (e) {
        return res.status(500).json({
            error: "Error en la confirmacion de cuenta de usuario",
            message: e.message
        });
    }
}

const loginUsuario = async (req, res) => {
    const dataLogin : LoginUsuario = req.body;
    try {
        //Busqueda de usuario
        const userToLogin = await Usuario.findOne({
            where: {
                email: dataLogin.email
            }
        });
        if(!userToLogin) {
            return res.status(404).json({
                error: `Usuario no registrado con el email: ${dataLogin.email}`
            });
        }
        if (!userToLogin.confirmado) {
            return res.status(409).json({
                error: "El usuario no ha confirmado su cuenta."
            });
        }
        const passwordCorrecta = await bcrypt.compare(dataLogin.password, userToLogin.password);
        if (!passwordCorrecta) {
            return res.status(403).json({
                error: "Error en credenciales del usuario",
            });
        }

        //Generacion de JWT
        const jwt: string = generateJWT(dataLogin.email);
        return res.status(200).json({
            success: "Login correcto",
            token: jwt
        });
    }catch (e) {
        return res.status(500).json({
            error: "Error en inicio de sesión",
            message: e.message
        });
    }
}

export {
    prueba,
    confirmacionCuenta,
    loginUsuario
}