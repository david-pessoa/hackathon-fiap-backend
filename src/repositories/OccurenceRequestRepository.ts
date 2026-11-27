import { AppDataSource } from '../config/data-source';
import { OccurenceRequest } from '../entities/OccurenceRequest';

export const occurenceRequestRepository = AppDataSource.getRepository(OccurenceRequest);
