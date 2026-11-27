import { AppDataSource } from '../config/data-source';
import { StatusHistory } from '../entities/StatusHistory';

export const statusHistoryRepository = AppDataSource.getRepository(StatusHistory);
