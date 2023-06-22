// import { Client } from 'pg'

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
//   process.env

// export const createClientAndConnect = async (): Promise<Client | null> => {
//   try {
//     const client = new Client({
//       user: POSTGRES_USER,
//       host: 'localhost',
//       database: POSTGRES_DB,
//       password: POSTGRES_PASSWORD,
//       port: Number(POSTGRES_PORT),
//     })

//     await client.connect()

//     const res = await client.query('SELECT NOW()')
//     console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
//     client.end()

//     return client
//   } catch (e) {
//     console.error(e)
//   }

//   return null
// }

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { userModel } from '../models/userTheme';

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'user',
  database: 'node_postgres',
  dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions); 

// Инициализируем модели
export const User = sequelize.define('User', userModel, {});

export async function dbConnect() {
    try {
        await sequelize.authenticate(); // Проверка аутентификации в БД
        await sequelize.sync(); // Синхронизация базы данных
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
