import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedules } from './schedule.entity';
import { Seat } from './seat.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'number_of_seats' })
  numberOfSeats: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @Column()
  status: number;

  @OneToMany(() => Schedules, (schedules) => schedules.cinema)
  @JoinColumn({ name: 'id' })
  schedules: Schedules[];

  @OneToMany(() => Seat, (seat) => seat.cinema)
  @JoinColumn({ name: 'id' })
  seats: Seat[];
}
