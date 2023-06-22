import { DataType, Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, ForeignKey } from 'sequelize-typescript';
// import type { ModelAttributes } from 'sequelize/types';

// export interface IUser {
//     firstName: string;
//     lastName: string;
// }

// export const userModel: ModelAttributes<Model, IUser>= {
//     firstName: {
//       type: DataType.STRING,
//       allowNull: false
//     },
//     lastName: {
//         type: DataType.STRING,
//     }
//   };

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme'
})
class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  theme: string;

  @Column(DataType.STRING)
  device: string;

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id'
  })
  ownerId: string;
} 
