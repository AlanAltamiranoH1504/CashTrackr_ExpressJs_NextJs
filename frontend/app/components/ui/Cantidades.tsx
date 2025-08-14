"use client"
import {formatoMoneda} from "../../../src/helpers";

type CantidadesProps = {
    presupuesto: {
        id: number;
        nombre: string;
        monto: number;
        updatedAt: string;
        usuarioId: number;
        gastos: {
            id: number;
            nombre: string;
            monto: number;
            updatedAt: string;
        }[];
    };
}
const Cantidades = ({presupuesto}: CantidadesProps) => {
    const totalGastado: number = presupuesto.gastos.reduce((acumulador, gasto) => {
        return acumulador = acumulador + gasto.monto
    }, 0);
    return (
        <>
            <div className="text-3xl text-center space-y-4">
                <h2 className={"text-indigo-900"}>Total de Presupuesto: <span className="text-amber-500">{formatoMoneda(presupuesto.monto)}</span>
                </h2>
                <h2 className="text-indigo-900">Total Gastado: <span className="text-amber-500">{formatoMoneda(totalGastado)}</span></h2>
                <h2 className="text-indigo-900">Disponible: <span className="text-amber-500">{formatoMoneda((presupuesto.monto - totalGastado))}</span></h2>
            </div>
        </>
    );
}
export default Cantidades;