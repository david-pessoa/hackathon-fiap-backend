import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Occurence } from './Occurence';
import { User } from './User';
import { OccurenceRequestStatus, OccurenceRequestType } from '../types/TablesEnums';

@Entity('occurence_requests')
@Unique(['occurence', 'requestedBy', 'reviewedBy'])
export class OccurenceRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  createdAt!: Date;

  @Column()
  reviewedAt!: Date;

  @Column({nullable: false})
  reason!: string;

  @Column({
      type: 'enum',
      enum: OccurenceRequestStatus,
      default: OccurenceRequestStatus.PENDING,
    })
    status!: OccurenceRequestStatus;

  @Column({
      type: 'enum',
      enum: OccurenceRequestType,
    })
    type!: OccurenceRequestStatus;

  @ManyToOne(() => Occurence, occurence => occurence.occurenceRequests, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'occurence_id' })
  occurence!: Occurence;

  @ManyToOne(() => User, user => user.closeOccurenceRequests, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'requested_by' })
  requestedBy!: User;

  @ManyToOne(() => User, user => user.reviewedOccurences, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewed_by' })
  reviewedBy!: User;

  @Column({ type: 'bytea', name: 'image', nullable: true })
  image!: Buffer | null;
}
