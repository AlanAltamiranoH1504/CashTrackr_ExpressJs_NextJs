import {
    FormLoginUser,
    FormOlvidePassword,
    FormResetPassword,
    FormTokenConfirmacionCuenta, PresupuestoToSave,
    UsuarioToSave
} from "../types";
import axios from "axios";
import {loginSuccessSchema, responseSavePresupuestoSchema, usuarioEnSesionSchema} from "../schemas";

export async function registroUsuariosPeticionPOST(data: UsuarioToSave) {
    try {
        const url = `http://localhost:3000/usuarios`;
        const responseAPI = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return responseAPI.data;
    } catch (e) {
        throw e;
    }
}

export async function confirmacionCuentaPOST(data: FormTokenConfirmacionCuenta) {
    try {
        const url = `http://localhost:3000/auth/confirmar/${data.tokenRequest}`;
        const responseAPI = await axios.post(url, data);
        return responseAPI.data;
    } catch (e) {
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
    } catch (e) {
        throw e;
    }
}

export async function usuarioEnSesionGET(tokenJWT: string | null) {
    try {
        const url = `http://localhost:3000/auth/usuario`;
        const responseAPI = await axios.get(url, {
            headers: {
                "Authorization": "Bearer " + tokenJWT
            }
        });
        const resultadoAPI = usuarioEnSesionSchema.safeParse(responseAPI.data);
        if (resultadoAPI.success) {
            return resultadoAPI.data;
        } else {
            console.log("No hay usuario en esesion")
        }
    } catch (e) {
        throw e;
    }
}

export async function olvidePasswordPOST(data: FormOlvidePassword) {
    try {
        const url = `http://localhost:3000/auth/olvide-password`;
        const responseAPI = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return responseAPI.data;
    } catch (e) {
        throw e;
    }
}

export async function resetPasswordPOST(data: FormResetPassword) {
    try {
        const url = `http://localhost:3000/auth/validacion-nueva-password`;
        const responseAPI = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return responseAPI.data;
    } catch (e) {
        throw e;
    }
}

export async function savePresupuestoPOST(data: PresupuestoToSave) {
    try {
        const url = `http://localhost:3000/presupuestos`;
        const responseAPI = await axios.post(url, data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("toke_cashTrackr")
            }
        });
        const resultadoAPI = responseSavePresupuestoSchema.safeParse(responseAPI.data);
        if (resultadoAPI.success) {
            return resultadoAPI.data
        } else {
            console.log("Error en guardado de presupuesto");
        }

    } catch (e) {
        throw e;
    }
}