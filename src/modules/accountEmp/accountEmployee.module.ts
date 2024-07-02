import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEmployee } from 'src/entities/accountEmp.entity';
import { AccountEmployeeController } from './accountEmployee.controller';
import { AccountEmployeeService } from './accountEmployee.service';
import { Role } from 'src/entities/role.entity';
import { Permission } from 'src/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEmployee, Role, Permission])],
  controllers: [AccountEmployeeController],
  providers: [AccountEmployeeService],
  exports: [AccountEmployeeService],
})
export class AccountEmployeeModule {}
