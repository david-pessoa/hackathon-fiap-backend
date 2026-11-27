import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './User';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToMany(() => User, users => users.categories)
  users!: User[];
}
