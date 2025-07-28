import FormularioRegistro from "../../components/auth/FormularioRegistro";
import {Metadata} from "next";

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
        </>
    );
}
export default RegisterPage;