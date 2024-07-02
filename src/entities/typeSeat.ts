import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seat } from './seat.entity';

@Entity()
export class TypeSeat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type_chair' })
  type: string;

  @Column()
  quantity: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @Column()
  status: number;

  @OneToMany(() => Seat, (seat) => seat.typeSeat)
  seats: Seat[];
}
