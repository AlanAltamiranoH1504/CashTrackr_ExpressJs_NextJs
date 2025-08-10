import Link from "next/link";
import FormEditarPresupuesto from "../../../../components/presupuestos/FormEditarPresupuesto";

const EdicionPresupuestPage = ({params}: {params: {id: number}}) => {
    return (
        <>
            <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
                <div className="w-full md:w-auto">
                    <h1 className="font-black text-4xl text-purple-950 my-5">Editar Presupuesto</h1>
                    <p className="text-xl font-bold">Llena el formulario y edita el {" "} <span className="text-amber-500">presupuesto</span> seleccionado</p>
                </div>
                <Link className="bg-amber-500 hover:bg-amber-600 transition-colors duration-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center" href="/administracion">Administracion</Link>
            </div>
            <div className="p-10 mt-10 shadow-lg border rounded-md">
                <FormEditarPresupuesto
                    params={params}
                />
            </div>
        </>
    );
}
export default EdicionPresupuestPage;