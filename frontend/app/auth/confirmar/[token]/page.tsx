"use client"
import Logo from "../../../components/ui/Logo";
import {useForm} from "react-hook-form";
import {FormTokenConfirmacionCuenta} from "../../../../types";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {confirmacionCuentaPOST} from "../../../../api";
import {useRouter} from "next/navigation";

type ConfirmacionCuentaProps = {
    params: {token: string}
}
const ConfirmacionCuentaPage = ({params}: ConfirmacionCuentaProps) => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<FormTokenConfirmacionCuenta>();
    function peticionConfirmacionCuenta(data: FormTokenConfirmacionCuenta) {
        confirmacionCuentaMutation.mutate(data);
    }

    const confirmacionCuentaMutation = useMutation({
        mutationKey: ["confirmacionCuentaUsuario"],
        mutationFn: confirmacionCuentaPOST,
        onSuccess: () => {
            toast.success("Cuenta confirmada correctamente.")
            router.push("/auth/login");
        },
        onError: () => {
            toast.error("Ocurrio un error en la confirmación de cuenta.");
            router.push("/auth/login");
        }
    });
    return (
        <>
            <div className="my-10 px-5 py-5 bg-white shadow-lg rounded-lg">
                <h2 className="text-4xl text-center font-bold my-10">Confirma tu Cuenta en {" "}
                    <span className="text-amber-500">CashTrackr</span>
                </h2>

                <form className="space-y-5"
                    onSubmit={handleSubmit(peticionConfirmacionCuenta)}
                >
                    <div className="bg-gray-400">
                        <Logo/>
                    </div>
                    <input
                        type={"hidden"}
                        value={params.token}
                        readOnly={true}
                        {...register("tokenRequest", {
                            required: "Token corrupto"
                        })}
                    />
                    <input type="submit" value="Confirmar Cuenta" className="w-full p-2 rounded-lg text-white uppercase text-xl bg-purple-800 hover:bg-purple-950 transition-colors duration-500"/>
                </form>
            </div>
        </>
    );
}
export default ConfirmacionCuentaPage;