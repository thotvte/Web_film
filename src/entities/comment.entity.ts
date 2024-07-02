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
import { Blog } from './blog.entity';
import { Movies } from './movie.entity';
import { Customer } from './customer.entity';
import { Employee } from './employee.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'movie_id' })
  movieId: number;

  @Column({ name: 'customer_id' })
  cusId: number;

  @Column({ name: 'employee_id' })
  empId: number;

  @Column({ name: 'blog_id' })
  blogId: number;

  @Column()
  comment: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne(() => Movies, (movie) => movie.Comments)
  @JoinColumn({ name: 'movie_id' })
  movie: Movies;

  @ManyToOne(() => Customer, (customer) => customer.comments)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Employee, (employee) => employee.comments)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
