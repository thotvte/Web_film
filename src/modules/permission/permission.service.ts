import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { InsertPermissionDto } from './dto/request/insert-permission.dto';
import { InsertPermissionResponse } from './dto/response/insert-permission';
import { Role } from 'src/entities/role.entity';
import { AccountEmployee } from 'src/entities/accountEmp.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(AccountEmployee)
    private accountEmployeeRepository: Repository<AccountEmployee>,
  ) {}

  async getPer(id: number) {
    const result = await this.permissionRepository.findOne({
      where: {
        id,
      },
      relations: ['accountEmployees', 'roles'],
    });
    return result;
  }

  async getPers(): Promise<Permission[]> {
    return this.permissionRepository.find({
      relations: ['accountEmployees', 'roles'],
    });
  }

  async addPer(data: InsertPermissionDto): Promise<InsertPermissionResponse> {
    const { roleIds, accountEmpIds, ...rest } = data;
    const newper = this.permissionRepository.create(rest);
    const roles = await this.roleRepository.find({
      where: { id: In(roleIds) },
    });
    newper.roles = roles;
    const accs = await this.accountEmployeeRepository.find({
      where: { id: In(accountEmpIds) },
    });
    newper.accountEmployees = accs;
    const savePer = await this.permissionRepository.save(newper);
    return savePer;
  }

  async updatePer(id: number, data: InsertPermissionDto): Promise<string> {
    const getId = await this.permissionRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy roles với id ${id}`);
    }
    const update = this.permissionRepository.merge(getId, data);
    if (data.roleIds) {
      const roles = await this.roleRepository.find({
        where: { id: In(data.roleIds) },
      });
      update.roles = roles;
    }
    if (data.accountEmpIds) {
      const accs = await this.accountEmployeeRepository.find({
        where: { id: In(data.accountEmpIds) },
      });
      update.accountEmployees = accs;
    }
    await this.permissionRepository.save(update);
    return 'Đã cập nhật thành công';
  }

  async deletePer(id: number): Promise<string> {
    await this.permissionRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
