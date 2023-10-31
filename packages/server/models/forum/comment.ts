import {
  AllowNull,
  Column,
  Model,
  Table,
  DataType,
  HasMany,
} from 'sequelize-typescript'
import { Like } from './like'
import { Reply } from './reply'

@Table({ tableName: 'comments', timestamps: false })
export class Comment extends Model {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_id!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  user_name!: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  body!: string

  @AllowNull(true)
  @Column(DataType.TEXT)
  img_url!: string

  @Column(DataType.DATE)
  created_at!: string

  @HasMany(() => Like, 'comment_id')
  likes!: Like[]

  @HasMany(() => Reply, 'comment_id')
  replies!: Reply[]
}
