"use client"
import * as React from "react";
import Link from "next/link";
import Logo from "../components/ui/Logo";
import {useQuery} from "@tanstack/react-query";
import {usuarioEnSesionGET} from "../../api";
import Error403 from "../components/ux/403Error";
import AdminMenu from "../components/admin/AdminMenu";

const AdministracionLayout = ({children,}: Readonly<{ children: React.ReactNode; }>) => {
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
            <header className='bg-purple-950 py-5'>
                <div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-96'>
                        <Link href={'/administracion'}>
                            <Logo/>
                        </Link>
                    </div>
                    <AdminMenu
                        data={data}
                    />
                </div>
            </header>
            <section className='max-w-5xl mx-auto mt-20 p-3 py-10'>
                {children}
            </section>

            <footer className='py-5'>
                <p className='text-center'>
                    Todos los Derechos Reservados {new Date().getFullYear()}
                </p>
            </footer>
        </>
    );
}
export default AdministracionLayout;