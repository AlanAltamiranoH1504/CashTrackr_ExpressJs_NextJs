"use client"
import {useQuery} from "@tanstack/react-query";
import {findPresupuestoByIdGET} from "../../../../api";
import Cargando from "../../../components/ux/Cargando";
import {useEffect} from "react";
import Error404 from "../../../components/ux/404Error";
import AgregarGastoBoton from "../../../components/gastos/AgregarGastoBoton";
import ModalContainer from "../../../components/ui/ModalContainer";

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
        // @ts-ignore
        if (error.response.data.error === "Error en la busqueda de presupuesto") {
            return <Error404/>
        }
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
            <ModalContainer/>
        </>
    );
}
export default DetallesPresupuestoPage;