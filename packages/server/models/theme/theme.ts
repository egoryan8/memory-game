import { AllowNull, Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({ tableName: 'themes', timestamps: false })
export class Theme extends Model {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  theme!: string
}
