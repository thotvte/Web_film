import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceDetail } from './invoiceDetail';
import { Employee } from './employee.entity';
import { Customer } from './customer.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'float' })
  discount: number;

  @Column({ name: 'employee_id' })
  employeeId: number;

  @Column({ default: 0 })
  status: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoice, {
    cascade: true,
  })
  invoiceDetails: InvoiceDetail[];

  @ManyToOne(() => Employee, (employee) => employee.invoices)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
