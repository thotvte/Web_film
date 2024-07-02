import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Employee } from './employee.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'account_employee' })
export class AccountEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ name: 'role_id' })
  roleId: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => Role, (role) => role.accountEmp)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Employee, (employee) => employee.accountEmployee)
  @JoinColumn({ name: 'id' })
  employee: Employee;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permission_accountemp',
    joinColumn: { name: 'accountemp_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: Permission[];
}
