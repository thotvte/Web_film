import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genres } from './genres.entity';
import { Schedules } from './schedule.entity';
import { Comment } from './comment.entity';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  Content: string;

  @Column()
  actors: string;

  @Column()
  duration: number;

  @Column()
  image: string;

  @Column({ name: 'age_rating' })
  ageRating: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @Column({ nullable: true })
  status: number;

  @ManyToMany(() => Genres)
  @JoinTable({
    name: 'movies_genres',
    joinColumn: { name: 'movie_id' },
    inverseJoinColumn: { name: 'genre_id' },
  })
  genres: Genres[];

  @OneToMany(() => Schedules, (schedules) => schedules.movie)
  @JoinColumn({ name: 'id' })
  schedules: Schedules[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  @JoinColumn({ name: 'id' })
  Comments: Comment[];
}
