import FormOlvidePassword from "../../components/auth/FormOlvidePassword";
import {Metadata} from "next";

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
        </>
    );
}
export default OlvidePasswordPage;