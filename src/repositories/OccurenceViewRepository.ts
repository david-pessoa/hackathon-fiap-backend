import { AppDataSource } from '../config/data-source';
import { OccurenceView } from '../entities/OccurenceView';

export const occurenceViewRepository = AppDataSource.getRepository(OccurenceView);
