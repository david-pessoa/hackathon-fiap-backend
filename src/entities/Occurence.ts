import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { User } from './User';
import { Category } from './Category';

enum OccurenceStatus {
  OPEN = 'OPEN',
  UNDER_ANALYSIS = 'UNDER_ANALYSIS',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

enum OccurencePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

enum OccurenceRating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

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
    default: OccurenceStatus.OPEN
  })
  status!: OccurenceStatus;

  @Column({
    type: 'enum',
    enum: OccurencePriority,
    default: OccurencePriority.LOW
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
    nullable: true
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
}
