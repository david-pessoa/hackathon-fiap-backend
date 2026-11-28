import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';

import { Role } from './Role';
import { Category } from './Category';
import { Occurence } from './Occurence';
import { OccurenceView } from './OccurenceView';
import { StatusHistory } from './StatusHistory';
import { Comment } from './Comment';
import { OccurenceRequest } from './OccurenceRequest';

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
  @JoinTable()
  categories!: Category[];

  @OneToMany(() => Occurence, occurence => occurence.requester)
  requestedOccurences!: Occurence[];

  @OneToMany(() => Occurence, occurence => occurence.assignedEmployee)
  assignedOccurences!: Occurence[];

  @OneToMany(() => OccurenceView, occurenceViews => occurenceViews.user)
  viewedOccurences!: OccurenceView[];

  @OneToMany(() => StatusHistory, statusHistory => statusHistory.changedBy)
  statusHistory!: StatusHistory[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => OccurenceRequest, occurenceRequest => occurenceRequest.requestedBy)
  closeOccurenceRequests!: OccurenceRequest[];

  @OneToMany(() => OccurenceRequest, occurenceRequest => occurenceRequest.reviewedBy)
  reviewedOccurences!: OccurenceRequest[];

}
