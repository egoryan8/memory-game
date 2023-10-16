import {
  AllowNull,
  Column,
  Model,
  Table,
  DataType,
  HasMany,
} from 'sequelize-typescript'
import { Comment } from './comment'

@Table({ tableName: 'topics', timestamps: false })
export class Topic extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  title!: string

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
  @Column(DataType.DATE)
  created_at!: string

  @HasMany(() => Comment, 'topic_id')
  comments!: Comment[]
}
