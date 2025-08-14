"use client"
import {useForm} from "react-hook-form";
import {FormUpdatePerfil} from "../../../types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {resetInformacionUsuarioPUT, usuarioEnSesionGET} from "../../../api";
import {useEffect} from "react";
import Cargando from "../ux/Cargando";
import Error404 from "../ux/404Error";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FormEditarPerfil = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormUpdatePerfil>();
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["usuarioEnSesion"],
        queryFn: () => usuarioEnSesionGET(localStorage.getItem("toke_cashTrackr")),
        refetchOnWindowFocus: false,
        retry: false
    });

    function updatePerfilUsuario(data: FormUpdatePerfil) {
        updateInformacioUsuarioMutation.mutate(data);
    }

    const updateInformacioUsuarioMutation = useMutation({
        mutationKey: ["updateInformacionUsuario"],
        mutationFn: resetInformacionUsuarioPUT,
        onSuccess: (data) => {
            toast.success("Información actualizada!")
            router.push("/administracion");
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.error);
        }
    })

    useEffect(() => {
        reset({
            nombre: data?.usuario.nombre,
            apellidos: data?.usuario.apellidos,
            email: data?.usuario.email
        });
    }, [data]);

    if (isLoading) {
        return <Cargando/>
    }

    if (isError) {
        return <Error404/>
    }

    return (
        <>
            <form
                className=" mt-14 space-y-5"
                noValidate
                onSubmit={handleSubmit(updatePerfilUsuario)}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Tu Nombre"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("nombre", {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center rounded-md mt-1">
                        {errors.nombre && String(errors.nombre.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                    >Apellidos</label>
                    <input
                        type="name"
                        placeholder="Tus apellidos"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("apellidos", {
                            required: "Los apellidos son obligatorios"
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center rounded-md mt-1">
                        {errors.apellidos && String(errors.apellidos.message)}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Tu Email"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        {...register("email", {
                            required: "El e-mail es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "El formato del e-mail no es valido"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center rounded-md mt-1">
                        {errors.email && String(errors.email.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    value='Guardar Cambios'
                    className="bg-purple-950 transition-colors duration-500 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    );
}
export default FormEditarPerfil;