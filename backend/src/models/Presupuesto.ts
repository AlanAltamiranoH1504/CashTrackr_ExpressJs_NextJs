import {Table, Column, DataType, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript"
import {Model} from "sequelize-typescript";
import Gasto from "./Gasto";
import Usuario from "./Usuario";

//Nombre de la tabla
@Table({
    tableName: "presupuestos"
})
//Definicion de atributos del modelo
class Presupuesto extends Model {
    @Column({type: DataType.STRING(100)})
    declare nombre: string;

    @Column({type: DataType.DECIMAL})
    declare monto: number;

    //Un Presupuesto tiene varios Gastos
    @HasMany(() => Gasto, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    declare gastos: Gasto[];

    //Un presupuesto pertenece a un usuario
    @ForeignKey(() => Usuario)
    declare usuarioId: number;
    @BelongsTo(() => Usuario)
    declare usuario: Usuario;
}

export default Presupuesto;