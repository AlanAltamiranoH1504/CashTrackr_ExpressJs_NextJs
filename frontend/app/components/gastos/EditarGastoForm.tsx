import {useParams, useSearchParams} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {findGastoByIdGET, updateGastoByIdPUT} from "../../../api";
import {useEffect} from "react";
import Cargando from "../ux/Cargando";
import Error404 from "../ux/404Error";
import {GastoDB, GastoToSave, GastoToUpdate} from "../../../types";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const EditarGastoForm = () => {
    const searchParams = useSearchParams();
    const params = useParams();
    const queryClient = useQueryClient();
    const idGasto = Number(searchParams.get("editGastoId"));
    const {register, handleSubmit, formState: {errors}, reset} = useForm<GastoToSave>()

    const {data, isLoading, isError} = useQuery({
        queryFn: () => findGastoByIdGET(idGasto),
        queryKey: ["findGastoById"],
        refetchOnWindowFocus: false,
        retry: false
    });

    function actualizarGasto(data: GastoToSave) {
        const dataWithPresupuestoId: GastoToUpdate = {
            id: idGasto,
            nombre: data.nombre,
            monto: data.monto,
            presupuestoId: Number(params.id)
        };
        updateGastoMutation.mutate(dataWithPresupuestoId);
    }

    const updateGastoMutation = useMutation({
        mutationKey: ["updateGastoById"],
        mutationFn: updateGastoByIdPUT,
        onSuccess: (data) => {
            toast.success(data?.success);
            queryClient.invalidateQueries({
                queryKey: ["findPresupuestoById"]
            });
        },
        onError: (error) => {
            toast.error("Error en actualizacion de gasto");
        }
    })

    useEffect(() => {
        if (data) {
            reset({
                nombre: data.nombre,
                monto: data.monto
            });
        }
    }, [data]);

    if (isLoading) {
        return <Cargando/>
    }
    if (isError) {
        return <Error404/>
    }

    return (
        <>
            <h2 className="font-black text-4xl text-purple-950 my-5">Editar Gasto</h2>
            <p className="text-xl font-bold">Actualiza los datos de un {''}
                <span className="text-amber-500">gasto</span>
            </p>

            <form
                onSubmit={handleSubmit(actualizarGasto)}
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border my-5"
                noValidate
            >
                <div className="my-4">
                    <label htmlFor="nombre" className="text-xl mb-2 uppercase">Nombre:</label>
                    <input type="text" className="p-2 w-full rounded-lg border"
                           placeholder={"Nombre del gasto"}
                           {...register("nombre", {
                               required: "El nombre es obligatorio"
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
                                   value: 1,
                                   message: "El monto minimo es de $1.00"
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
                    value='Actualizar Gasto'
                />
            </form>
        </>
    );
}
export default EditarGastoForm;