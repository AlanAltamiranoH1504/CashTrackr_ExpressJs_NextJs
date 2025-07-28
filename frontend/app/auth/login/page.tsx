import FormularioLogin from "../../components/auth/FormularioLogin";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CashTrackr - Iniciar Sesión",
    description: "CashTrackr - Iniciar Sesión",
}

const LoginPage = () => {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Inicia Sesión</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>

            <FormularioLogin/>

            <nav className="md:flex md:flex-col gap-3 mt-10">
                <Link href={"/auth/register"} className="text-center">¿No tienes una cuenta? <span className="text-amber-500 hover:text-amber-600 transition-colors duration-500">Registrate</span></Link>
                <Link href={"/auth/olvide-password"} className="text-center">¿Olvidaste tu Password? <span className="text-amber-500 hover:text-amber-600 transition-colors duration-500">Recuperala</span></Link>
            </nav>
        </>
    );
}
export default LoginPage;