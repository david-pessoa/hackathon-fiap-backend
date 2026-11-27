import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { User } from './User';
import { Occurence } from './Occurence';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToMany(() => User, users => users.categories)
  users!: User[];

  @OneToMany(() => Occurence, occurences => occurences.category)
  occurence!: Occurence[];
}
