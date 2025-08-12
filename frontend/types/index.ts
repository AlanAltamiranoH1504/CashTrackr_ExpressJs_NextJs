export type UsuarioDB = {
    id: number,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    token: string,
    confirmado: boolean
}
export type PresupuestoDB = {
    id: number,
    nombre: string,
    monto: number,
    presupuestoId: number
}
export type GastoDB = {
    id: number,
    nombre: string,
    monto: number
}

export type UsuarioToSave = Pick<UsuarioDB, "nombre" | "apellidos" | "password" | "email">
export type PresupuestoToSave = Pick<PresupuestoDB, "nombre" | "monto">
export type PresupuestoToUpdate = Pick<PresupuestoDB, "id" | "nombre" | "monto">
export type GastoToSave = Pick<GastoDB, "nombre" | "monto">

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
export type FormSaveGastoWithPresupuestoId = {
    nombre: string,
    monto: number,
    presupuestoId: number
}