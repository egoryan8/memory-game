import { AllowNull, Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({ tableName: 'topics', timestamps: false })
export class Topic extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  body!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number
}
