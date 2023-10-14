import { AllowNull, Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({ tableName: 'comments', timestamps: false })
export class Comment extends Model {
  @AllowNull(true)
  @Column(DataType.INTEGER)
  comment_id!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_id!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  body!: string
}
