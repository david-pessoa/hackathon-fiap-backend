import { AppDataSource } from '../config/data-source';

export const commentRepository = AppDataSource.getRepository(Comment);
