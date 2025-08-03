import {UsuarioToSave} from "../types";
import axios from "axios";

export async function registroUsuariosPeticionPOST(data: UsuarioToSave) {
    try {
        const url = `http://localhost:3000/usuarios`;
        const responseAPI = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }catch (e) {
        throw e;
    }
}