import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from './models/forum/topic'
import { Comment } from './models/forum/comment'
import { Theme } from './models/theme/theme'
import { Like } from './models/forum/like'
import { Reply } from './models/forum/reply'
import { config } from 'dotenv'

config()
const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env
console.log('POSTGRES_HOST', POSTGRES_HOST)
console.log('POSTGRES_USER', POSTGRES_USER)
console.log('POSTGRES_PASSWORD', POSTGRES_PASSWORD)
console.log('POSTGRES_DB', POSTGRES_DB)
console.log('POSTGRES_PORT', POSTGRES_PORT)
const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  host: POSTGRES_HOST || '51.250.104.193',
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || '11223344',
  database: POSTGRES_DB || 'memorybase',
  port: Number(POSTGRES_PORT),
  models: [Topic, Comment, Like, Theme, Reply],
}

export async function createSequelizeConnection() {
  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.addModels([Topic, Comment, Like, Theme, Reply])

  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('➜ 🎸 Connected to the database.')
  } catch (error) {
    console.error(error)
  }
  return sequelize
}
