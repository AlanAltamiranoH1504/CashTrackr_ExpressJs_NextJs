import bcrypt = require("bcrypt");
import {v4 as uuidv4} from "uuid";
import Usuario from "../models/Usuario";
import {LoginUsuario, OlvidePassword} from "../types";
import {generateJWT} from "../helpers/JWT";
import {emailOlvidePassword} from "../helpers/Emails";

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
    } catch (e) {
        return res.status(500).json({
            error: "Error en la confirmacion de cuenta de usuario",
            message: e.message
        });
    }
}

const loginUsuario = async (req, res) => {
    const dataLogin: LoginUsuario = req.body;
    try {
        //Busqueda de usuario
        const userToLogin = await Usuario.findOne({
            where: {
                email: dataLogin.email
            }
        });
        if (!userToLogin) {
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
    } catch (e) {
        return res.status(500).json({
            error: "Error en inicio de sesión",
            message: e.message
        });
    }
}

const olvidePassword = async (req, res) => {
    const {email} = req.body;

    try {
        const usuarioToUpdate = await Usuario.findOne({
            where: {email}
        });
        if (!usuarioToUpdate) {
            return res.status(404).json({
                error: "Usuario no encontrado con ese email",
            });
        }

        //Generacion nuevo token y nuevo email
        usuarioToUpdate.token = uuidv4();
        await usuarioToUpdate.save();
        const datos: OlvidePassword = {
            nombre: usuarioToUpdate.nombre,
            email: usuarioToUpdate.email,
            token: usuarioToUpdate.token
        }
        emailOlvidePassword(datos);
        return res.status(200).json({
            success: "Revisa tu email para instrucciones"
        });
    } catch (e) {
        return res.status(500).json({
            error: "Error en reestablecimiento de password",
            message: e.message
        });
    }
}

const confirmarNuevaPassword = async (req, res) => {
    try {
        const {token, password} = req.body;
        //Busqueda de usuario con ese token
        const usuarioToUpdate = await Usuario.findOne({
            where: {token}
        });
        if (!usuarioToUpdate) {
            return res.status(404).json({
                error: "Usuario no encontrado ese token"
            });
        }

        //Guardamos nueva password y borramos token
        usuarioToUpdate.token = null;
        const nuevaPassword = await bcrypt.hash(password, 10);
        usuarioToUpdate.password = nuevaPassword;
        await usuarioToUpdate.save();

        return res.status(200).json({
            success: "Password restablecida correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            error: "Error en reestablecimiento de password",
            message: e.message
        });
    }
}

const usuarioEnSesion = async (req, res) => {
    const usuarioEnSesion = req.usuario;
    return res.status(200).json({
        usuario: usuarioEnSesion
    });
}

export {
    prueba,
    confirmacionCuenta,
    loginUsuario,
    olvidePassword,
    confirmarNuevaPassword,
    usuarioEnSesion
}