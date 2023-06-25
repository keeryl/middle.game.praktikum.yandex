import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Comment } from './comment'

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'replies',
})
export class Reply extends Model<Reply> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  message: string

  @AllowNull(true)
  @Column(DataType.INTEGER)
  parent_id: number

  @AllowNull(true)
  @Column(DataType.INTEGER)
  user_id: number

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  comment_id: number
}
