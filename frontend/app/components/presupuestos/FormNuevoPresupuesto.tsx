"use client"
import {useForm} from "react-hook-form";
import {PresupuestoToSave} from "../../../types";
import {useMutation} from "@tanstack/react-query";
import {savePresupuestoPOST} from "../../../api";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FormNuevoPresupuesto = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<PresupuestoToSave>();
    const router = useRouter();
    function guardarPresupuesto(data: PresupuestoToSave) {
        savePresupuestoMutation.mutate(data);
    }

    const savePresupuestoMutation = useMutation({
        mutationKey: ["savePresupuesto"],
        mutationFn: savePresupuestoPOST,
        onSuccess: () => {
            toast.success("Presupuesto guardado!");
            router.push("/administracion");
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.error);
            router.push("/administracion");
        }
    });
    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(guardarPresupuesto)}
            >
                <div className="space-y-3">
                    <label className="uppercase font-bold text-xl" htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="monto"
                        className="w-full p-3  border border-gray-100 bg-slate-100 rounded-md"
                        placeholder="Cantidad Presupuesto"
                        {...register("nombre", {
                            required: "El nombre es obligatorio"
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
                            required: "El monto inicial es obligatorio",
                            min: {
                                value: 10,
                                message: "El valor minimo para un presupuesto es $10"
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
                    value='Crear Presupuesto'
                />
            </form>
        </>
    );
}
export default FormNuevoPresupuesto;