"use client"
import {useForm} from "react-hook-form";
import type {FormOlvidePassword} from "../../../types";
import {useMutation} from "@tanstack/react-query";
import {olvidePasswordPOST} from "../../../api";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FormOlvidePassword = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormOlvidePassword>();
    const router = useRouter()
    function enviarPeticion (data: FormOlvidePassword) {
        olvidePasswordMutation.mutate(data);
    }
    const olvidePasswordMutation = useMutation({
        mutationKey: ["olvidePasswordEmail"],
        mutationFn: olvidePasswordPOST,
        onSuccess: () => {
            toast.success("Instucciones enviadas al email");
            router.push("/auth/login");
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.error);
        }
    });

    return (
        <>
            <form
                className=" mt-14 space-y-5"
                noValidate
                onSubmit={handleSubmit(enviarPeticion)}
            >
                <div className="flex flex-col gap-2 mb-10">
                    <label
                        className="font-bold text-2xl"
                    >Email</label>

                    <input
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("email", {
                            required: "El email es obligatorio"
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center rounded-md shadow-md">
                        {errors.email && String(errors.email.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-purple-950 hover:bg-purple-800 transition-colors duration-500 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
                />
            </form>
        </>
    );
}
export default FormOlvidePassword;