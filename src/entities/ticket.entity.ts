import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seat } from './seat.entity';
import { Schedules } from './schedule.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ name: 'seat_id' })
  seatId: number;

  @Column({ name: 'name_movie' })
  nameMovie: string;

  @Column({ type: 'datetime' })
  schedule: Date;

  @Column()
  status: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'unit_price' })
  unitPrice: number;

  @Column({ name: 'schedules_id' })
  schedulesId: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => Seat, (seat) => seat.ticket)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @OneToOne(() => Schedules, (schedules) => schedules.ticket)
  @JoinColumn({ name: 'schedules_id' })
  schedules: Schedules;
}
