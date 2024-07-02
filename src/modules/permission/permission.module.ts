import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Role } from 'src/entities/role.entity';
import { AccountEmployee } from 'src/entities/accountEmp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role, AccountEmployee])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModules {}
