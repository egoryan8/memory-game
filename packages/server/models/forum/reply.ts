import {
  AllowNull,
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
import { Comment } from './comment'
import { Like } from './like'

@Table({ tableName: 'replies', timestamps: false })
export class Reply extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  body!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  user_name!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_id!: number

  @Column(DataType.DATE)
  created_at!: string

  @BelongsTo(() => Comment, 'comment_id')
  comment!: Comment

  @Column(DataType.INTEGER)
  reply_id!: number

  @HasMany(() => Like, 'reply_id')
  likes: Like[] = []
}
