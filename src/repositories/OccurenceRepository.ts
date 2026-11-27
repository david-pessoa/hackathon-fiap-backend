import { AppDataSource } from '../config/data-source';
import { Occurence } from '../entities/Occurence';

export const occurenceRepository = AppDataSource.getRepository(Occurence);
