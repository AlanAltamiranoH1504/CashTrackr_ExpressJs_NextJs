"use client"
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"


type GraficaProgresoProps = {
    porcentajeGastado: number
}
const GraficaProgreso = ({porcentajeGastado}: GraficaProgresoProps) => {
    return (
        <>
            <div className="flex justify-center py-10">
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentajeGastado >= 100 ? "#DC2626": "#F59E0B",
                        trailColor: "#E1E1E1",
                        textColor: porcentajeGastado >= 100 ? "#DC2626": "#F59E0B",
                        textSize: 8
                    })}
                    text={`${porcentajeGastado}% gastado`}
                    value={porcentajeGastado}/>
            </div>
        </>
    );
}
export default GraficaProgreso;