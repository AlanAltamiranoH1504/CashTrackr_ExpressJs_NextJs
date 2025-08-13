"use client"
import {useQuery} from "@tanstack/react-query";
import {findGastosByPresupuestoId, findPresupuestoByIdGET} from "../../../../api";
import Cargando from "../../../components/ux/Cargando";
import {useEffect} from "react";
import Error404 from "../../../components/ux/404Error";
import AgregarGastoBoton from "../../../components/gastos/AgregarGastoBoton";
import ModalContainer from "../../../components/ui/ModalContainer";
import {formatoFecha, formatoMoneda} from "../../../../src/helpers";
import ExpenseMenu from "../../../components/gastos/ExpenseMenu";

type DetallesPresupuestoProps = {
    params: { id: number }
}
const DetallesPresupuestoPage = ({params}: DetallesPresupuestoProps) => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findPresupuestoById"],
        queryFn: () => findPresupuestoByIdGET(params.id),
        refetchOnWindowFocus: false,
        retry: false
    });
    useEffect(() => {
    }, [data]);

    if (isLoading) {
        return <Cargando/>
    }

    if (isError) {
        return <Error404/>
    }

    // @ts-ignore
    return (
        <>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className="font-black text-4xl text-purple-950">{data?.presupuesto.nombre}</h1>
                    <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span>
                    </p>
                </div>

                <AgregarGastoBoton/>
            </div>
            {data?.presupuesto.gastos.length ? (
                <>
                    <h1 className="text-3xl text-purple-950 mt-10">Gastos en este presupuesto:</h1>
                    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
                        {data.presupuesto.gastos.map((expense) => (
                            <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {expense.nombre}
                                        </p>
                                        <p className="text-xl font-bold text-amber-500">
                                            {formatoMoneda(expense.monto)}
                                        </p>
                                        <p className='text-gray-500  text-sm'>
                                            Última modificación el: {" "} <span>{formatoFecha(expense.updatedAt)}</span>
                                        </p>
                                    </div>
                                </div>
                                <ExpenseMenu
                                    id={expense.id}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <p className="text-center uppercase my-10">No hay gastos aun</p>
                </>
            )}
            <ModalContainer/>
        </>
    );
}
export default DetallesPresupuestoPage;