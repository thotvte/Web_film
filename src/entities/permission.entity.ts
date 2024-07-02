import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { AccountEmployee } from './accountEmp.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'permission_role',
    joinColumn: { name: 'permission_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @ManyToMany(() => AccountEmployee)
  @JoinTable({
    name: 'permission_accountemp',
    joinColumn: { name: 'permission_id' },
    inverseJoinColumn: { name: 'accountemp_id' },
  })
  accountEmployees: AccountEmployee[];
}
