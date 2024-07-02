import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedules } from './schedule.entity';
import { Seat } from './seat.entity';

@Entity({ name: 'price_seat_schedule' })
export class PriceSeatSchedules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'time_slot' })
  timeSlot: string;

  @Column({ name: 'schedules_id' })
  schedulesId: number;

  @Column({ name: 'seat_id' })
  SeatId: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Schedules, (schedules) => schedules.priceSeatSchedules)
  @JoinColumn({ name: 'schedules_id' })
  schedules: Schedules;

  @ManyToOne(() => Seat, (seat) => seat.priceSeatSchedules)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;
}
