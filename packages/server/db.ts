import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Topic } from './models/topic';
import { Comment } from './models/comment';
import { Reply } from './models/reply';
import { Reaction } from './models/reaction';
import { ReactionType } from './models/reactionType';
import { User } from './models/user';
import { SiteTheme } from './models/siteTheme';
import { UserTheme } from './models/userTheme';
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT) || 5432, // переменная окружения недоступна, исправил позже
  username: POSTGRES_USER || 'admin', // переменная окружения недоступна, исправил позже
  password: POSTGRES_PASSWORD || 'root', // переменная окружения недоступна, исправил позже
  database: POSTGRES_DB || 'good-game', // переменная окружения недоступна, исправил позже
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([Topic, Comment, Reply, Reaction, ReactionType, User, SiteTheme, UserTheme])

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
