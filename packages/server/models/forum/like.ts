import { AllowNull, Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({ tableName: 'likes', timestamps: false })
export class Like extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  comment_id!: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  topic_id!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  emoji!: string
}
