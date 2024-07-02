import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountCus } from './accountCus.entity';
import { Invoice } from './invoice.entity';
import { Blog } from './blog.entity';
import { Comment } from './comment.entity';

@Entity()
export class Customer {
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

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ name: 'account_cus_id' })
  accountCusId: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => AccountCus, (accountCus) => accountCus.customer)
  @JoinColumn({ name: 'account_cus_id' })
  accountCus: AccountCus;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  @JoinColumn({ name: 'id' })
  invoices: Invoice[];

  @OneToMany(() => Blog, (blog) => blog.employee)
  blogs: Blog[];

  @OneToMany(() => Comment, (comment) => comment.customer)
  comments: Comment[];
}
