import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Occurence } from './Occurence';
import { User } from './User';

@Entity('comments')
@Unique(['occurence', 'user'])
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  createdAt!: Date;

  @Column({nullable: false})
  content!: string;

  @ManyToOne(() => Occurence, occurence => occurence.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'occurence_id' })
  occurence!: Occurence;

  @ManyToOne(() => User, user => user.comments, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'bytea', name: 'image', nullable: true })
  image!: Buffer | null;
}
