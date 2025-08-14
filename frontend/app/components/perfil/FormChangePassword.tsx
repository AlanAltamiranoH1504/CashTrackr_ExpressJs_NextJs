"use client"
import {useForm} from "react-hook-form";
import {FormResetPasswordAuth} from "../../../types";
import {useMutation} from "@tanstack/react-query";
import {resetePasswordAuthPUT} from "../../../api";
import {toast} from "react-toastify";

const FormChangePassword = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormResetPasswordAuth>();

    function resetPassword(data: FormResetPasswordAuth) {
        resetPasswordAuthMutation.mutate(data);
    }

    const resetPasswordAuthMutation = useMutation({
        mutationKey: ["resetPasswordAuth"],
        mutationFn: resetePasswordAuthPUT,
        onSuccess: (data) => {
            toast.success(data?.success);
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response?.data?.errror);
        }
    })

    return (
        <>
            <form
                className=" mt-14 space-y-5"
                noValidate
                onSubmit={handleSubmit(resetPassword)}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="current_password"
                    >Password Actual</label>
                    <input
                        id="current_password"
                        type="password"
                        placeholder="Password Actual"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("passwordOld", {
                            required: "El password actual es obligatoria"
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 rounded-md">
                        {errors.passwordOld && String(errors.passwordOld.message)}
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="password"
                    >Nuevo Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("newPassword", {
                            required: "El nuevo password es obligatoria"
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 rounded-md">
                        {errors.newPassword && String(errors.newPassword.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Cambiar Password'
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    );
}
export default FormChangePassword;