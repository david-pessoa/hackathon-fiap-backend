import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { env } from './env';
import { User } from '../entities/User';
import { Role } from '../entities/Role';
import { Category } from '../entities/Category';

import { InitialSchema1795650437924 } from '../migrations/1795650437924-InitialSchema';

export const AppDataSource = new DataSource({
  type: 'postgres',
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,
  synchronize: false,
  logging: false,
  entities: [User, Role, Category],
  migrations: [InitialSchema1795650437924
  ],
});
