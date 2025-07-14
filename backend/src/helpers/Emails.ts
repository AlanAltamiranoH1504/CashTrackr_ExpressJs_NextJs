import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {ConfirmacionCuentaUsuario, OlvidePassword} from "../types";
dotenv.config();

const emailConfirmacionCuenta = async (datos: ConfirmacionCuentaUsuario) => {
    const transport = nodemailer.createTransport({
        host: process.env.HOST_MAILTRAP,
        port: +process.env.PORT_MAILTRAP,
        auth: {
            user: process.env.USERNAME_MAILTRAP,
            pass: process.env.PASSWORD_MAILTRAP
        }
    });
    await transport.sendMail({
        from: "CashTrackr App",
        to: datos.email,
        subject: "Confirma tu Cuenta en CashTrackr",
        text: "Confirma tu Cuenta en CashTrackr",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Hola ${datos.nombre},</h2>
                <p style="font-size: 16px; color: #333;">
                    Gracias por registrarte en <strong>CashTrackr</strong>. Para activar tu cuenta, por favor confirma tu dirección de correo electrónico haciendo clic en el siguiente enlace:
                </p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.BACKEND_URL}/auth/confirmar/${datos.token}" 
                       style="display: inline-block; padding: 12px 25px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Confirmar Cuenta
                    </a>
                </p>
                <p style="font-size: 14px; color: #666;">
                    Si tú no creaste esta cuenta, puedes ignorar este mensaje sin problemas.
                </p>
                <p style="font-size: 14px; color: #999; margin-top: 40px;">
                    &copy; ${new Date().getFullYear()} CashTrackr. Todos los derechos reservados.
                </p>
            </div>
        `
    });
}

const emailOlvidePassword = async (datos: OlvidePassword) => {
    const transport = nodemailer.createTransport({
        host: process.env.HOST_MAILTRAP,
        port: +process.env.PORT_MAILTRAP,
        auth: {
            user: process.env.USERNAME_MAILTRAP,
            pass: process.env.PASSWORD_MAILTRAP
        }
    });

    await transport.sendMail({
        from: "CashTrackr App",
        to: datos.email,
        subject: "Recupera tu password | CashTrackr",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Hola ${datos.nombre},</h2>
                <p style="font-size: 16px; color: #333;">
                    Has solicitado restablecer tu password en <strong>CashTrackr</strong>. Para reestablecerla, por favor haz clic en el siguiente enlace:
                </p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.BACKEND_URL}/auth/olvide-password/${datos.token}" 
                       style="display: inline-block; padding: 12px 25px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Recuperar Password
                    </a>
                </p>
                <p style="font-size: 14px; color: #666;">
                    Si tú no solicitaste restablecer tu password, puedes ignorar este mensaje sin problemas.
                </p>
                <p style="font-size: 14px; color: #999; margin-top: 40px;">
                    &copy; ${new Date().getFullYear()} CashTrackr. Todos los derechos reservados.
                </p>
            </div>
        `
    })
}

export {
    emailConfirmacionCuenta,
    emailOlvidePassword
}