import {Table, Column, DataType, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript"
import {Model} from "sequelize";

//Nombre de la tabla
@Table({
    tableName: "presupuestos"
})
//Definicion de atributos del modelo
class Presupuesto extends Model {
    @Column({type: DataType.STRING(100)})
    nombre: string;

    @Column({type: DataType.DECIMAL})
    monto: number;

    @Column({type: DataType.DATE})
    created_at: Date;

    @Column({type: DataType.DATE})
    updated_at: Date;
}

export default Presupuesto;