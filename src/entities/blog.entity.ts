import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movies } from './movie.entity';
import { Employee } from './employee.entity';
import { Customer } from './customer.entity';
import { Comment } from './comment.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: 'cus_id' })
  cusId: number;

  @Column({ name: 'emp_id' })
  empId: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Movies)
  @JoinTable({
    name: 'blog_movie',
    joinColumn: { name: 'movie_id' },
    inverseJoinColumn: { name: 'blog_id' },
  })
  movies: Movies[];

  @ManyToOne(() => Employee, (employee) => employee.blogs)
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;

  @ManyToOne(() => Customer, (customer) => customer.blogs)
  @JoinColumn({ name: 'emp_id' })
  customer: Customer;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];
}
