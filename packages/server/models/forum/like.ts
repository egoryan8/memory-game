import {
  AllowNull,
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
} from 'sequelize-typescript'
import { Comment } from './comment'

@Table({ tableName: 'likes', timestamps: false })
export class Like extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  comment_id!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  emoji!: string

  @BelongsTo(() => Comment, 'comment_id')
  comment!: Comment
}
