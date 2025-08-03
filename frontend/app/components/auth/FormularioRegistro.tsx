"use client"

import {useForm} from "react-hook-form";
import {UsuarioDB, UsuarioToSave} from "../../../types";
import {useMutation} from "@tanstack/react-query";
import {registroUsuariosPeticionPOST} from "../../../api";
import {toast} from "react-toastify";

const FormularioRegistro = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<UsuarioToSave>();

    function registroUsuario(data: UsuarioToSave) {
        console.log("Registrando usuario");
        registroUsuarioMutation.mutate(data);
    }

    const registroUsuarioMutation = useMutation({
        mutationKey: ["registroUsuario"],
        mutationFn: registroUsuariosPeticionPOST,
        onSuccess: () => {
            toast.success("Usuario registrado.Verifica tu e-mail.")
        },
        onError: () => {
            toast.error("Error en el registro de usuario.");
        }
    })

    return (
        <>
            <form
                onSubmit={handleSubmit(registroUsuario)}
                className="my-14 space-y-5"
                noValidate>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold text-2xl">Email:</label>
                    <input type="email" id="email" className="w-full border border-gray-300 p-3 rounded-lg"
                           placeholder="Email de registro"
                           {...register("email", {
                               required: "El email es obligatorio",
                           })}
                    />
                    <div className=" bg-red-100 text-red-600 text-center font-bold rounded-md">
                        {errors.email && String(errors.email.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="nombre" className="font-bold text-2xl">Nombre:</label>
                    <input type="text" id="nombre" className="w-full border border-gray-300 p-3 rounded-lg"
                           placeholder="Nombre de registro"
                           {...register("nombre", {
                               required: "El nombre es obligatorio"
                           })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-bold rounded-md">
                        {errors.nombre && String(errors.nombre.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor={"apellidos"} className="font-bold text-2xl">Apellidos:</label>
                    <input type="text" id="apellidos" className="w-full border border-gray-300 p-3 rounded-lg"
                           placeholder="Apellidos de registro"
                           {...register("apellidos", {
                               required: "Los apellidos son obligatorios"
                           })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-bold rounded-md">
                        {errors.apellidos && String(errors.apellidos.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-bold text-2xl">Passsword:</label>
                    <input type="password"
                           className="w-full border border-gray-300 p-3 rounded-lg"
                           placeholder="Password de registro"
                           {...register("password", {
                               required: "El password es obligatorio",
                               minLength: {
                                   value: 3,
                                   message: "El password debe tener al menos 3 caracteres"
                               }
                           })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-bold rounded-md">
                        {errors.password && String(errors.password.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-2xl">Repetir Password</label>
                    <input id="password_confirmation" type="password" placeholder="Repite Password de Registro"
                           className="w-full border border-gray-300 p-3 rounded-lg"
                           name="password_confirmation"
                    />
                </div>

                <input type="submit" value="Registrarme"
                       className=" uppercase bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block transition-colors duration-500"/>
            </form>
        </>
    );
}
export default FormularioRegistro;