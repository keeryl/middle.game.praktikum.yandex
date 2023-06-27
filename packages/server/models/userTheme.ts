import {
    AllowNull, AutoIncrement, Column,
    DataType, ForeignKey, Model, PrimaryKey, Table,
} from "sequelize-typescript";
import { User } from "./user";

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'user_theme'
})
export class UserTheme extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    override id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    theme: string;

    // @Column(DataType.STRING)
    // device: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'owner_id'
    })
    ownerId: string;
} 
