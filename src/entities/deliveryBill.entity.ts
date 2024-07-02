import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeliveryBillDetail } from './deliveryBillDetail.entity';
import { Employee } from './employee.entity';

@Entity()
export class DeliveryBill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column({ name: 'employee_id' })
  employeeId: number;

  @Column()
  status: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(
    () => DeliveryBillDetail,
    (deliveryBillDetail) => deliveryBillDetail.deliveryBill,
  )
  @JoinColumn({ name: 'id' })
  deliveryBillDetails: DeliveryBillDetail[];

  @ManyToOne(() => Employee, (employee) => employee.deliveryBills)
  @JoinColumn({ name: 'id' })
  employee: Employee;
}
