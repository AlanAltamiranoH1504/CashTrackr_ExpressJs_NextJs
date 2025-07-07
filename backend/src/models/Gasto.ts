//Nombre de la tabla
import {Column, DataType, Model, Table, ForeignKey, BelongsTo} from "sequelize-typescript";
import Presupuesto from "./Presupuesto";

@Table({
    tableName: "gastos"
})
//Atributos del modelo
class Gasto extends Model {
    @Column({type: DataType.STRING(100)})
    declare nombre: string

    @Column({type: DataType.DECIMAL})
    declare monto: number

    //Un gasto pertenece a un presupuesto
    @ForeignKey(() => Presupuesto)
    declare presupuestoId: number
    @BelongsTo(() => Presupuesto)
    declare presupuesto: Presupuesto
}

export default Gasto;