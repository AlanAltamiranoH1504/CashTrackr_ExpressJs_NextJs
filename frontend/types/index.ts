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