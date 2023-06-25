import {
    AllowNull, AutoIncrement, BelongsTo, Column,
    DataType, ForeignKey, Model, PrimaryKey, Table,
} from "sequelize-typescript";
import { User } from "./user";
import { SiteTheme } from "./siteTheme";

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'user_theme'
})
export class UserTheme extends Model<UserTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => SiteTheme)
    @BelongsTo(() => SiteTheme, {
        onDelete: "CASCADE",
    })
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
