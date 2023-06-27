import {
  AllowNull, AutoIncrement, Column,
  DataType, Model, PrimaryKey, Table,
} from "sequelize-typescript";

@Table({
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    tableName: "users",
})
export class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
      override id: number;
      
    @AllowNull(false)
    @Column(DataType.STRING)
      nickname: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
      user_id: number;
}
