import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Occurence } from './Occurence';
import { User } from './User';

@Entity('occurence_views')
@Unique(['occurence', 'user'])
export class OccurenceView {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  viewedAt!: Date;

  @ManyToOne(() => Occurence, occurence => occurence.views, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'occurence_id' })
  occurence!: Occurence;

  @ManyToOne(() => User, user => user.viewedOccurences, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
