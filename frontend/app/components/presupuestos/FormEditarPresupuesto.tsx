"use client"
import {useMutation, useQuery} from "@tanstack/react-query";
import {findPresupuestoByIdGET, updatePresupuestoByIdPUT} from "../../../api";
import {useForm} from "react-hook-form";
import {PresupuestoToSave, PresupuestoToUpdate} from "../../../types";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

type FormEditarPresupuestoProps = {
    params: { id: number }
}
const FormEditarPresupuesto = ({params}: FormEditarPresupuestoProps) => {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["findPresupuestoById"],
        queryFn: () => findPresupuestoByIdGET(params.id),
        retry: false,
        refetchOnWindowFocus: false
    });
    const {register, handleSubmit, formState: {errors}, reset} = useForm<PresupuestoToSave>()

    function actualizarPresupuesto(data: PresupuestoToSave) {
        console.log("Actualizando en base de datos");
        const dataWithId: PresupuestoToUpdate = {
            id: params.id,
            nombre: data.nombre,
            monto: data.monto
        };
        updatePresupuestoMutation.mutate(dataWithId);
    }

    const updatePresupuestoMutation = useMutation({
        mutationKey: ["updatePresupuestoById"],
        mutationFn: updatePresupuestoByIdPUT,
        onSuccess: () => {
            toast.success("Presupuesto actualizado correctamente!");
            router.push("/administracion");
        },
        onError: () => {
            toast.error("Error en actualizacion de presupuesto");
            router.push("/administracion");
        }
    });
    useEffect(() => {
        reset({
            monto: data?.presupuesto.monto,
            nombre: data?.presupuesto.nombre
        })
    }, [data])

    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(actualizarPresupuesto)}
            >
                <div className="space-y-3">
                    <label className="uppercase font-bold text-xl" htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="monto"
                        className="w-full p-3  border border-gray-100 bg-slate-100 rounded-md"
                        placeholder="Cantidad Presupuesto"
                        {...register("nombre", {
                            required: "El nombre del presupuesto es obligatorio"
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 rounded-md">
                        {errors.nombre && String(errors.nombre.message)}
                    </div>
                </div>

                <div className="space-y-3">
                    <label htmlFor="amount" className="text-xl uppercase font-bold">
                        Cantidad Presupuesto:
                    </label>
                    <input
                        type="number"
                        id="amount"
                        className="w-full p-3  border border-gray-100 bg-slate-100 rounded-md"
                        placeholder="Cantidad Presupuesto"
                        {...register("monto", {
                            required: "El monto es obligatorio",
                            min: {
                                value: 10,
                                message: "El presupuesto minimo es de $10.00"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-center text-red-600 rounded-md">
                        {errors.monto && String(errors.monto.message)}
                    </div>
                </div>

                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-xl duration-500 rounded-md text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Confirmar Edición'
                />
            </form>
        </>
    );
}
export default FormEditarPresupuesto;