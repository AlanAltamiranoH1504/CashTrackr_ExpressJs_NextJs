import {FormLoginUser, FormTokenConfirmacionCuenta, UsuarioToSave} from "../types";
import axios from "axios";
import {loginSuccessSchema} from "../schemas/registerAccountSchema";
import {locales} from "zod";

export async function registroUsuariosPeticionPOST(data: UsuarioToSave) {
    try {
        const url = `http://localhost:3000/usuarios`;
        const responseAPI = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return responseAPI.data;
    }catch (e) {
        throw e;
    }
}
export async function confirmacionCuentaPOST(data: FormTokenConfirmacionCuenta) {
    try {
        const url = `http://localhost:3000/auth/confirmar/${data.tokenRequest}`;
        const responseAPI = await axios.post(url, data);
        return responseAPI.data;
    }catch (e) {
        throw e;
    }
}

export async function loginUsuarioPOST(data: FormLoginUser) {
    try {
        const url = `http://localhost:3000/auth/login`;
        const responseAPI = await axios.post(url, data);
        const resultadoAPI = loginSuccessSchema.safeParse(responseAPI.data);
        if (resultadoAPI.success) {
            const data = resultadoAPI.data;
            localStorage.setItem("toke_cashTrackr", data.token);
        } else {
            console.log("Respuesta de error");
        }
    }catch (e) {
        throw e;
    }
}