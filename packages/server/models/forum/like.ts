import {
  AllowNull,
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
} from 'sequelize-typescript'
import { Comment } from './comment'
import { Reply } from './reply'

@Table({ tableName: 'likes', timestamps: false })
export class Like extends Model {
  @AllowNull(true)
  @Column(DataType.INTEGER)
  comment_id!: number

  @AllowNull(true)
  @Column(DataType.INTEGER)
  reply_id!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  emoji!: string

  @BelongsTo(() => Comment, 'comment_id')
  comment!: Comment

  @BelongsTo(() => Reply, 'reply_id')
  reply!: Reply
}
