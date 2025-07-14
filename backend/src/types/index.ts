export type Usuario = {
    id: number,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    token: string,
    confirmado: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export type ConfirmacionCuentaUsuario = Pick<Usuario, "nombre" | "email" | "token">