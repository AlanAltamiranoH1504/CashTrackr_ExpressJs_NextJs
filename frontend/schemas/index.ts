import {z} from "zod";

export const index = z.object({
    email: z.string().email("El email no tiene un formato valido"),
    password: z.string()
        .min(3, "La contraseña debe tener al menos 3 caracteres")
        .max(50, "La contraseña debe ser maximo de 50 caracteres"),
    nombre: z.string()
        .min(1, "El nombre es obligatorio")
        .max(50, "El nombre debe ser maximo de 50 caracteres"),
    apellidos: z.string()
        .min(1, "Los apellidos son obligatorios")
        .max(100, "Los apellidos deben ser maximo 100 caracteres")
});

export const loginSuccessSchema = z.object({
    token: z.string(),
    success: z.string()
});
export const loginErrorSchema = z.object({
    error: z.string()
});
export const usuarioEnSesionSchema = z.object({
    usuario: z.object({
        id: z.number(),
        nombre: z.string(),
        apellidos: z.string(),
        email: z.string()
    })
});
export const responseSavePresupuestoSchema = z.object({
    msg: z.string()
});