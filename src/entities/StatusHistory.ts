import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Occurence } from './Occurence';
import { User } from './User';
import { OccurenceStatus } from '../types/TablesEnums';

@Entity('status_history')
@Unique(['occurence', 'changedBy'])
export class StatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  createdAt!: Date;

  @Column()
  observation!: string;

  @Column({
    type: 'enum',
    enum: OccurenceStatus,
    default: OccurenceStatus.OPEN,
  })
  previousStatus!: OccurenceStatus;

  @Column({
    type: 'enum',
    enum: OccurenceStatus,
    default: OccurenceStatus.UNDER_ANALYSIS,
  })
  newStatus!: OccurenceStatus;

  @ManyToOne(() => Occurence, occurence => occurence.statusHistory, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'occurence_id' })
  occurence!: Occurence;

  @ManyToOne(() => User, user => user.statusHistory, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'manager_id' })
  changedBy!: User;

  @Column({ type: 'bytea', name: 'image', nullable: true })
  image!: Buffer | null;
}
