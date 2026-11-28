import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { env } from './env';
import { User } from '../entities/User';
import { Role } from '../entities/Role';
import { Category } from '../entities/Category';
import { Occurence } from '../entities/Occurence';
import { OccurenceView } from '../entities/OccurenceView';
import { StatusHistory } from '../entities/StatusHistory';
import { Comment } from '../entities/Comment';
import { OccurenceRequest } from '../entities/OccurenceRequest';

import { InitialSchema1795650437924 } from '../migrations/1795650437924-InitialSchema';
import { CreateOccurenceTable1795741884534 } from '../migrations/1795741884534-CreateOccurenceTable';
import { CreateOccurenceViewTable1795743339699 } from '../migrations/1795743339699-CreateOccurenceViewTable';
import { CreateStatusHistoryTable1795744795559 } from '../migrations/1795744795559-CreateStatusHistoryTable';
import { CommentTable1795745816103 } from '../migrations/1795745816103-CommentTable';
import { OccurenceRequestTable1795747389598 } from '../migrations/1795747389598-OccurenceRequestTable';
import { CorrigeColunaCategories1795824884058 } from '../migrations/1795824884058-CorrigeColunaCategories';

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
  entities: [
    User,
    Role,
    Category,
    Occurence,
    OccurenceView,
    StatusHistory,
    Comment,
    OccurenceRequest,
  ],
  migrations: [
    InitialSchema1795650437924,
    CreateOccurenceTable1795741884534,
    CreateOccurenceViewTable1795743339699,
    CreateStatusHistoryTable1795744795559,
    CommentTable1795745816103,
    OccurenceRequestTable1795747389598,
    CorrigeColunaCategories1795824884058
  ],
});
