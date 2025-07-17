import Usuario from "../models/Usuario";
import jwt from "jsonwebtoken";

const validacionEmailYaRegistrado = async (req, res, next) => {
    try {
        const {email} = req.body;
        const usuarioConEmail = await Usuario.findOne({
            where: {
                email: email
            }
        });
        if (usuarioConEmail) {
            return res.status(409).json({
                error: "Email ya registrado por un usuario."
            });
        }
        next();
    }catch (e) {
        return res.status(500).json({
            error: "Error en la verificacion de email ya registrado",
            message: e.message
        });
    }
}

const usuarioEnSesionMiddleware =  async (req, res, next) => {
    try {
        const AUTHORIZATION_JWT = req.headers.authorization;
        //Validacion de existencia de token
        if (!AUTHORIZATION_JWT) {
            return res.status(401).json({
                error: "JWT NO ENCONTRADO EN HEADERS"
            });
        }

        //Validacion de token y obtencion de informacion
        const token = AUTHORIZATION_JWT.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: "JWT CORRUPTO"
            });
        }
        const tokenValido = jwt.verify(token, process.env.JWT_SECRET);
        if (!tokenValido) {
            return res.status(401).json({
                error: "JWT CORRUPTO"
            });
        }
        //Verificacion tipado de JWT
        if (typeof tokenValido === "string") {
            return res.status(401).json({
                errror: "JWT CORRUPTO"
            });
        }

        //Obtencion de detalles del token
        const {email} = tokenValido;
        const usuarioEnSesion: Usuario = await Usuario.findOne({
            where: {email},
            attributes: ["id", "nombre", "apellidos", "email"]
        });
        if (!usuarioEnSesion) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            })
        }

        //Guardado de usuario en request
        req.usuario = usuarioEnSesion;
        next();
    }catch (e) {
        return res.status(401).json({
            error: "Login no realizado correctamente",
            message: e.message
        });
    }
}

export {
    validacionEmailYaRegistrado,
    usuarioEnSesionMiddleware
}