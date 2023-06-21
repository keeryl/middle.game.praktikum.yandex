
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
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

export async function dbConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}