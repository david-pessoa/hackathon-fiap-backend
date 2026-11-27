import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { env } from './env';
import { User } from '../entities/User';
import { Role } from '../entities/Role';
import { Category } from '../entities/Category';
import { Occurence } from '../entities/Occurence';

import { InitialSchema1795650437924 } from '../migrations/1795650437924-InitialSchema';
import { CreateOccurenceTable1795741884534 } from '../migrations/1795741884534-CreateOccurenceTable';


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
  entities: [User, Role, Category, Occurence],
  migrations: [InitialSchema1795650437924, CreateOccurenceTable1795741884534],
});
