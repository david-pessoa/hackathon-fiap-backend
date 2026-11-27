import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OccurencePriority, OccurenceRating, OccurenceStatus } from '../types/TablesEnums';
import { User } from './User';
import { Category } from './Category';
import { OccurenceView } from './OccurenceView';
import { StatusHistory } from './StatusHistory';
import { Comment } from './Comment';

@Entity('occurences')
export class Occurence {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    type: 'enum',
    enum: OccurenceStatus,
    default: OccurenceStatus.OPEN,
  })
  status!: OccurenceStatus;

  @Column({
    type: 'enum',
    enum: OccurencePriority,
    default: OccurencePriority.LOW,
  })
  priority!: OccurencePriority;

  @Column()
  location!: string;

  @Column({ type: 'bytea', name: 'image', nullable: true })
  image!: Buffer | null;

  @Column()
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: OccurenceRating,
    nullable: true,
  })
  rating!: OccurenceRating | null;

  @ManyToOne(() => User, user => user.requestedOccurences, { nullable: false })
  @JoinColumn({ name: 'requester_id' })
  requester!: User;

  @ManyToOne(() => User, user => user.assignedOccurences, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  assignedEmployee!: User;

  @ManyToOne(() => Category, category => category.occurence, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @OneToMany(() => OccurenceView, occurenceViews => occurenceViews.occurence)
  views!: OccurenceView[];

  @OneToMany(() => StatusHistory, statusHistory => statusHistory.occurence)
  statusHistory!: StatusHistory[];

  @OneToMany(() => Comment, comment => comment.occurence)
  comments!: Comment[];
}
