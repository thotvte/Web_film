import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeSeat } from './typeSeat';
import { Cinema } from './cinema.entity';
import { Ticket } from './ticket.entity';
import { PriceSeatSchedules } from './priceSeatSchedule.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'type_seat_id' })
  typeSeatId: number;

  @Column({ name: 'row_name' })
  rowName: string;

  @Column({ name: 'column_name' })
  columnName: string;

  @Column({ name: 'cinema_id' })
  cinemaId: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @Column()
  status: number;

  @ManyToOne(() => TypeSeat, (typeSeat) => typeSeat.seats)
  @JoinColumn({ name: 'type_seat_id' })
  typeSeat: TypeSeat;

  @OneToOne(() => Ticket, (ticket) => ticket.seat)
  @JoinColumn({ name: 'id' })
  ticket: Ticket;

  @ManyToOne(() => Cinema, (cinema) => cinema.seats)
  @JoinColumn({ name: 'cinema_id' })
  cinema: Cinema;

  @OneToMany(
    () => PriceSeatSchedules,
    (priceSeatSchedules) => priceSeatSchedules.seat,
  )
  @JoinColumn({ name: 'id' })
  priceSeatSchedules: PriceSeatSchedules[];
}
