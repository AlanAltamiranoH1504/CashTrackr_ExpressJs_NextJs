import {useForm} from "react-hook-form";
import {FormSaveGastoWithPresupuestoId, GastoToSave} from "../../../types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {saveGastoPOST} from "../../../api";
import {toast} from "react-toastify";
import {useParams, useRouter} from "next/navigation";

const AgregarGastoForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<GastoToSave>();
    const router = useRouter();
    const params = useParams();
    const queryClient = useQueryClient();

    function agregarGastoForm(data: GastoToSave) {
        const dataWithIdPresupuesto: FormSaveGastoWithPresupuestoId = {
            ...data,
            presupuestoId: Number(params.id)
        };
        saveGastoMutation.mutate(dataWithIdPresupuesto);
    }
    const saveGastoMutation = useMutation({
        mutationKey: ["saveGasto"],
        mutationFn: saveGastoPOST,
        onSuccess: () => {
            toast.success("Gasto agregado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["findPresupuestoById"]
            });
        },
        onError: () => {
            toast.error("Error en creacion de gastto");
            router.push("/administracion");
        }
    });

    return (
        <>
            <h2 className="font-black text-4xl text-purple-950 my-5">Agregar Gasto</h2>
            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-amber-500">gasto</span>
            </p>
            <form
                onSubmit={handleSubmit(agregarGastoForm)}
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border my-5"
                noValidate
            >
                <div className="my-4">
                    <label htmlFor="nombre" className="text-xl mb-2 uppercase">Nombre:</label>
                    <input type="text" className="p-2 w-full rounded-lg border"
                           placeholder={"Nombre del gasto"}
                           {...register("nombre", {
                               required: "El nombre del gasto esobligatorio"
                           })}
                    />
                    <div className="bg-red-100 text-red-600 rounded-md text-center mt-1">
                        {errors.nombre && String(errors.nombre.message)}
                    </div>
                </div>

                <div className="my-4">
                    <label htmlFor="monto" className="text-xl mb-2 uppercase">Monto:</label>
                    <input type="number" className="p-2 w-full rounded-lg border"
                           placeholder={"Monto del gasto"}
                           {...register("monto", {
                               required: "El monto es obligatorio",
                               min: {
                                   value: 10,
                                   message: "El monto minimo es $10.00"
                               }
                           })}
                    />
                    <div className="bg-red-100 text-red-600 rounded-md text-center mt-1">
                        {errors.monto && String(errors.monto.message)}
                    </div>
                </div>


                <input
                    type="submit"
                    className="bg-amber-500 w-full rounded-lg transition-colors duration-500 p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Registrar Gasto'
                />
            </form>
        </>
    );
}
export default AgregarGastoForm;