"use client"
import Link from "next/link";
import {useForm} from "react-hook-form";
import type {FormResetPassword} from "../../../../types";
import {useMutation} from "@tanstack/react-query";
import {resetPasswordPOST} from "../../../../api";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

type FormResetPasswordProps = {
    params: {token: string}
}
const FormResetPassword = ({params}: FormResetPasswordProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormResetPassword>();
    const router = useRouter();
    function peticionReset(data: FormResetPassword) {
        const dataWithToken = {
            ...data,
            token: params.token
        }
        resetPasswordMutation.mutate(dataWithToken);
    }

    const resetPasswordMutation = useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: resetPasswordPOST,
        onSuccess: () => {
            toast.success("Password actualizada correctamente");
            router.push("/auth/login");
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.error);
            router.push("/auth/login");
        }
    });

    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">aqui puedes <span className="text-amber-500">restablecerla</span></p>

            <form
                className=" mt-14 space-y-5"
                noValidate
                onSubmit={handleSubmit(peticionReset)}
            >
                <div className="flex flex-col gap-2 mb-10">
                    <label
                        className="font-bold text-2xl"
                    >Password Nueva</label>

                    <input
                        type="password"
                        placeholder="Minimo 5 caracteres"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("password", {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 5,
                                message: "El password debe tener al menos 5 caracteres"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center rounded-md shadow-md">
                        {errors.password && String(errors.password.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-purple-950 hover:bg-purple-800 transition-colors duration-500 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
                />
            </form>
            {/*<FormResetPassword/>*/}
            <nav className="md:flex md:flex-col gap-3 mt-10">
                <Link href={"/auth/login"} className="text-center">¿Ya tienes cuenta? <span className="text-amber-500 hover:text-amber-600 transition-colors duration-500">Inicia Sesión</span></Link>
                <Link href={"/auth/register"} className="text-center">¿No tienes una cuenta? <span className="text-amber-500 hover:text-amber-600 transition-colors duration-500">Registrate</span></Link>
            </nav>
        </>
    );
}
export default FormResetPassword;