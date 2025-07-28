import FormularioRegistro from "../../components/auth/FormularioRegistro";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CashTrackr - Crear Cuenta",
    description: "CashTrackr - Crear Cuenta"
}
const RegisterPage = () => {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Crea una Cuenta</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>
            <FormularioRegistro/>

            <nav className="md:flex md:flex-col gap-3">
                <Link href={"/auth/login"} className="text-center">¿Ya tienes cuenta? <span className="text-amber-500 hover:text-amber-600 transition-colors duration-500">Inicia Sesión</span></Link>
                <Link href={"/auth/olvide-password"} className="text-center">¿Olvidaste tu Password? <span className="text-amber-500 hover:text-amber-600 transition-colors duration-500">Recuperala</span></Link>
            </nav>
        </>
    );
}
export default RegisterPage;