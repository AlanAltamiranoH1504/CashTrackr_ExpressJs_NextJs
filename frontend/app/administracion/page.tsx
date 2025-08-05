"use client"
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {usuarioEnSesionGET} from "../../api";
import Error403 from "../components/ux/403Error";

const AdministracionPage = () => {
    const tokenLocalStorage: string | null = localStorage.getItem("toke_cashTrackr");
    const {data, isLoading, isError} = useQuery({
        queryKey: ["usuarioEnSesion"],
        queryFn: () => usuarioEnSesionGET(tokenLocalStorage),
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <Error403/>
    }

    if (data) return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className="font-black text-4xl text-purple-950 my-5">Mis Presupuestos</h1>
                    <p className="text-xl font-bold">Maneja y administra tus {''}
                        <span className="text-amber-500">presupuestos</span>
                    </p>
                </div>
                <Link
                    href={'/admin/budget/new'}
                    className='bg-amber-500 hover:bg-amber-600 transition-colors duration-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Crear Presupuesto
                </Link>
            </div>
        </>
    );
}
export default AdministracionPage;