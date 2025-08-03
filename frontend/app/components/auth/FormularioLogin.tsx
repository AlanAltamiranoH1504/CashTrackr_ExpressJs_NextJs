"use client"
import {useForm} from "react-hook-form";
import {FormLoginUser} from "../../../types";
import {useMutation} from "@tanstack/react-query";
import {loginUsuarioPOST} from "../../../api";
import {toast} from "react-toastify";

const FormularioLogin = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormLoginUser>();

    function peticionLogin(data: FormLoginUser) {
        loginUsuarioMutation.mutate(data);
    }

    const loginUsuarioMutation = useMutation({
        mutationKey: ["loginUsuario"],
        mutationFn: loginUsuarioPOST,
        onError: () => {
            toast.error("Error en credenciales de usuario")
        },
        onSuccess: () => {
            toast.success("Login exitoso");
        }
    });

    return (
        <>
            <form
                className="mt-14 space-y-5"
                noValidate
                onSubmit={handleSubmit(peticionLogin)}
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Formato de e-mail incorrecto"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-bold rounded-md">
                        {errors.email && String(errors.email.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("password", {
                            required: "El password es obligatorio"
                        })}
                    />
                    <div className="bg-red-100 text-center font-bold text-red-600 rounded-md">
                        {errors.password && String(errors.password.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-purple-950 hover:bg-purple-800 transition-colors duration-500 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    );
}
export default FormularioLogin;