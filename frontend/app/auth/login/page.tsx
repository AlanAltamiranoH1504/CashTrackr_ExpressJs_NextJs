import FormularioLogin from "../../components/auth/FormularioLogin";
import {Metadata} from "next";

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
        </>
    );
}
export default LoginPage;