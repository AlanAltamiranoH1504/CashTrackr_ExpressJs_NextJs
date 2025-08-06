export type UsuarioDB = {
    id: number,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    token: string,
    confirmado: boolean
}
export type UsuarioToSave = Pick<UsuarioDB, "nombre" | "apellidos" | "password" | "email">
export type FormTokenConfirmacionCuenta = {
    tokenRequest: string
}
export type FormLoginUser = {
    email: string,
    password: string
}
export type FormOlvidePassword = {
    email: string
}
export type FormResetPassword = {
    password: string,
    token: string
}