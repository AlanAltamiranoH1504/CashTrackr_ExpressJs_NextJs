import * as React from "react";
import Link from "next/link";
import Logo from "../components/ui/Logo";

const AdministracionLayout = ({children,}: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <>
            <header className='bg-purple-950 py-5'>
                <div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-96'>
                        <Link href={'/admin'}>
                            <Logo/>
                        </Link>
                    </div>
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