"use server"
import {registerAccountSchema} from "../schemas/registerAccountSchema";
import {ZodError} from "zod";

async function createCuentaAction(formData: FormData) {
    const registerFormData = {
        email: formData.get("email"),
        password: formData.get("password"),
        nombre: formData.get("nombre"),
        apellidos: formData.get("apellidos")
    };
    const resultComparacion = registerAccountSchema.safeParse(registerFormData);
    if (resultComparacion.success) {
        const url = `${process.env.API_URL_BACKEND}/usuarios`;
        try {
            const responseAPI = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resultComparacion.data)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                return data;
            }).catch((error) => {
                return error
            });
            console.log(responseAPI);
        } catch (e) {
            console.log("Error en envio de peticion");
        }
    } else {
        const error = resultComparacion.error.issues;
        const erroresArray: string[] = [];
        error.map((e) => {
            erroresArray.push(e.message);
        });
    }
}

export default createCuentaAction;