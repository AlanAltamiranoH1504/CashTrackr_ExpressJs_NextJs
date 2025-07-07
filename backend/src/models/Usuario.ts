import {AllowNull, Column, DataType, Default, HasMany, Model, Table, Unique} from "sequelize-typescript";
import Presupuesto from "./Presupuesto";

@Table({
    tableName: "usuarios"
})

//Atributos del modelo
class Usuario extends Model{
    @AllowNull
    @Column({type: DataType.STRING(50)})
    declare nombre: string;

    @AllowNull
    @Column({type: DataType.STRING(100)})
    declare apellidos: string;

    @AllowNull
    @Unique(true)
    @Column({type: DataType.STRING(100)})
    declare email: string;

    @AllowNull
    @Column({type: DataType.STRING(50)})
    declare password: string;

    @Column({type: DataType.STRING(200)})
    declare token: string;

    @Default(false)
    @Column({type: DataType.BOOLEAN})
    declare confirmado: boolean;

    //Un usuario puede tener varios presupuestos
    @HasMany(() => Presupuesto, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    declare presupuestos: Presupuesto[];
}

export default Usuario;