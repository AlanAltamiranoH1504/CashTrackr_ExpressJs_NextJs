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
export type Presupuesto = {
    id: number,
    nombre: string,
    monto: number,
    usuarioId: number
}

export type UsuarioEnSesion = Pick<Usuario, "id" | "nombre" | "apellidos" | "email">
export type ConfirmacionCuentaUsuario = Pick<Usuario, "nombre" | "email" | "token">
export type OlvidePassword = Pick<Usuario, "nombre" | "email" | "token">
export type LoginUsuario = Pick<Usuario, "email" | "password">