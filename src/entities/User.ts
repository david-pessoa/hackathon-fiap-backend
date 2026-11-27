import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';

import { Role } from './Role';
import { Category } from './Category';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  cpf!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column()
  password!: string;

  @Column({ type: 'bytea', name: 'image', nullable: true })
  image!: Buffer | null;

  @ManyToOne(() => Role, role => role.users, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @ManyToMany(() => Category, categories => categories.users, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  categories!: Category;

  // @OneToMany(() => Post, post => post.user)
  // posts!: Post[];

  // @OneToMany(() => Comment, comment => comment.user)
  // comments!: Comment[];
}
