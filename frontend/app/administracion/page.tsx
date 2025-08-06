"use client"
import Link from "next/link";
import {findAllPresupuestosGET} from "../../api";
import {useQuery} from "@tanstack/react-query";
import Cargando from "../components/ux/Cargando";
import {formatoFecha, formatoMoneda} from "../../src/helpers";
import PresupuestoMenu from "../components/presupuestos/PresupuestoMenu";

const AdministracionPage = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["findAllPresupuestos"],
        queryFn: findAllPresupuestosGET,
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <Cargando/>
    }

    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className="font-black text-4xl text-purple-950 my-5">Mis Presupuestos</h1>
                    <p className="text-xl font-bold">Maneja y administra tus {''}
                        <span
                            className="text-amber-500">presupuestos</span>
                    </p>
                </div>
                <Link
                    href={'/administracion/presupuestos/new'}
                    className='bg-amber-500 hover:bg-amber-600 transition-colors duration-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Crear Presupuesto
                </Link>
            </div>
            {data?.length > 0 ? (
                <>
                    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
                        {data.map((presupuesto) => (
                            <li key={presupuesto.id} className="flex justify-between gap-x-6 p-5 ">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <Link
                                                className="cursor-pointer hover:text-purple-950 text-2xl font-bold transition-colors duration-500"
                                                href={`/administracion/presupuestos/${presupuesto.id}`}>{presupuesto.nombre}</Link>
                                        </p>
                                        <p className="text-xl font-bold text-amber-500">
                                            {formatoMoneda(presupuesto.monto)}
                                        </p>
                                        <p className='text-gray-500  text-sm'>
                                            <span
                                                className="text-black">Última Actualización:</span> {formatoFecha(presupuesto.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">
                                    <PresupuestoMenu
                                        id={presupuesto.id}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <div className="my-10 flex flex-col items-center justify-center space-y-3">
                        <h2 className="text-xl text-center">
                            No tienes presupuestos disponibles
                        </h2>
                        <Link
                            className="p-3 border bg-purple-950 hover:bg-purple-800 transition-colors duration-500 text-center w-full max-w-xl text-white rounded-lg"
                            href="/administracion/presupuestos/new"
                        >
                            Genera un nuevo <span className="text-amber-500">presupuesto</span>
                        </Link>
                    </div>

                </>
            )}
        </>
    );
}
export default AdministracionPage;