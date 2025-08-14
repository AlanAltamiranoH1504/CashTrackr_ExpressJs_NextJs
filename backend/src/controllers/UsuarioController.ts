import Usuario from "../models/Usuario";
import bcrypt = require("bcrypt");
import {v4 as uuidv4} from "uuid";
import {emailConfirmacionCuenta} from "../helpers/Emails";
import {ConfirmacionCuentaUsuario, UsuarioEnSesion} from "../types";

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
    } catch (e) {
        return res.status(500).json({
            error: "Error en el registro de usuario",
            message: e.message
        });
    }
}

const reestablecerPassword = async (req, res) => {
    const usuario: UsuarioEnSesion = req.usuario;
    try {
        const {passwordOld, newPassword} = req.body;
        const userTpUpdate = await Usuario.findOne({
            where: {email: usuario.email}
        });

        //Comparacion de password vieja
        const correctOldPassword = await bcrypt.compare(passwordOld, userTpUpdate.password);
        if (!correctOldPassword) {
            return res.status(401).json({
                errror: "Password antigua no correcta"
            });
        }

        //Seteo de nueva password
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        userTpUpdate.password = newPasswordHash;
        await userTpUpdate.save();

        return res.status(200).json({
            success: "Password actualizada correctamente"
        });
    } catch (e) {
        return res.status(500).json({
            error: "Error en actualizacion de password",
            message: e.message
        })
    }
}

const checkPassword = async (req, res) => {
    try {
        const usuarioInSesion: UsuarioEnSesion = req.usuario;
        const {password} = req.body;
        const userToCheck = await Usuario.findOne({where: {email: usuarioInSesion.email}});
        const checkPasswords = await bcrypt.compare(password, userToCheck.password);
        if (!checkPasswords) {
            return res.status(401).json({
                error: "La password no es correcta"
            });
        }
        return res.status(200).json({
            success: "Password correcta"
        });
    } catch (e) {
        return res.status(500).json({
            error: "Error en check de password",
            message: e.message
        })
    }
}

const updateInformacionUsuario = async (req, res) => {
    try {
        const idSesion = req.usuario.id;
        const usuarioToUpdate = await Usuario.findByPk(idSesion);

        usuarioToUpdate.nombre = req.body.nombre;
        usuarioToUpdate.apellidos = req.body.apellidos;
        usuarioToUpdate.email = req.body.email;
        await usuarioToUpdate.save();

        return res.status(200).json({
            sucesss: "Perfil de usuario actualizado correctamente",
        });
    } catch (e) {
        return res.status(500).json({
            error: "Error en actualizacion de datos de usuario",
            message: e.message
        });
    }
}

export {
    prueba,
    save,
    reestablecerPassword,
    checkPassword,
    updateInformacionUsuario
}