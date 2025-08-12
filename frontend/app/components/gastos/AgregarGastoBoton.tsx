"use client"
import {useRouter} from "next/navigation";

const AgregarGastoBoton = () => {
    const router = useRouter();
    return (
        <>
            <button type={"button"}
                    onClick={() => {
                        router.push("?agregarGasto=true&showModal=true")
                    }}
                    className="bg-amber-500 hover:bg-amber-600 transition-colors duration-500 px-10 py-2 rounded-lg text-white cursor-pointer">
                Agregar Gasto
            </button>
        </>
    );
}
export default AgregarGastoBoton;