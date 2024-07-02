import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEmployee } from './accountEmp.entity';
import { DeliveryBill } from './deliveryBill.entity';
import { Invoice } from './invoice.entity';
import { Blog } from './blog.entity';
import { Comment } from './comment.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: string;

  @Column()
  email: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'hire_date', type: 'date' })
  hireDate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column({ name: 'account_employee_id' })
  accountEmployeeId: number;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToOne(
    () => AccountEmployee,
    (accountEmployee) => accountEmployee.employee,
  )
  @JoinColumn({ name: 'account_employee_id' })
  accountEmployee: AccountEmployee;

  @OneToMany(() => DeliveryBill, (deliveryBill) => deliveryBill.employee)
  @JoinColumn({ name: 'id' })
  deliveryBills: DeliveryBill[];

  @OneToMany(() => Invoice, (invoice) => invoice.employee)
  // @JoinColumn({ name: 'id' })
  invoices: Invoice[];

  @OneToMany(() => Blog, (blog) => blog.employee)
  blogs: Blog[];

  @OneToMany(() => Comment, (comment) => comment.employee)
  comments: Comment[];
}
