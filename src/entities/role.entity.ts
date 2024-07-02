import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEmployee } from './accountEmp.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_name' })
  roleName: string;

  @Column()
  description: string;

  @OneToOne(() => AccountEmployee, (accountEmp) => accountEmp.role)
  accountEmp: AccountEmployee;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permission_role',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  Permissions: Permission[];
}
