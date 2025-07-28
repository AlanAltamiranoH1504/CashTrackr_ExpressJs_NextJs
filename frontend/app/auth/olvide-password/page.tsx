import FormOlvidePassword from "../../components/auth/FormOlvidePassword";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CashTrackr - Olvide Password",
    description: "CashTrackr - Olvide Password",
}

const OlvidePasswordPage = () => {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">aqui puedes <span className="text-amber-500">restablecerla</span></p>
            <FormOlvidePassword/>
            <nav className="md:flex md:flex-col gap-3 mt-10">
                <Link href={"/auth/login"} className="text-center">¿Ya tienes cuenta? <span className="text-amber-500 hover:text-amber-600 transition-colors duration-500">Inicia Sesión</span></Link>
                <Link href={"/auth/register"} className="text-center">¿No tienes una cuenta? <span className="text-amber-500 hover:text-amber-600 transition-colors duration-500">Registrate</span></Link>
            </nav>
        </>
    );
}
export default OlvidePasswordPage;