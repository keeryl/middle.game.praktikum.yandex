
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Topic } from './models/topic';
import { Comment } from './models/comment';
import { Reply } from './models/reply';
import { Reaction } from './models/reaction';
import { ReactionType } from './models/reactionType';
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: Number(POSTGRES_PORT) || 5432,
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || 'postgres',
    database: POSTGRES_DB || 'postgres',
    dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([Topic, Comment, Reply, Reaction, ReactionType])

export async function dbConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}