import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { In, Repository } from 'typeorm';
import { InsertRoleDto } from './dto/request/insert-role.dto';
import { InsertRoleResponse } from './dto/response/insert-role.dto';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async getRole(id: number) {
    const result = await this.roleRepository.findOne({
      where: { id },
      relations: ['Permissions'],
    });
    return result;
  }

  async getRoles() {
    return this.roleRepository.find({
      relations: ['Permissions'],
    });
  }

  async addRole(data: InsertRoleDto): Promise<InsertRoleResponse> {
    const { permissionIds, ...rest } = data;
    const newRole = this.roleRepository.create(rest);
    const per = await this.permissionRepository.find({
      where: { id: In(permissionIds) },
    });
    newRole.Permissions = per;
    const saveRole = await this.roleRepository.save(newRole);
    return saveRole;
  }

  async updateRole(id: number, data: InsertRoleDto): Promise<string> {
    const getId = await this.roleRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy Role với id ${id}`);
    }
    const update = this.roleRepository.merge(getId, data);
    if (data.permissionIds) {
      const per = await this.permissionRepository.find({
        where: { id: In(data.permissionIds) },
      });
      update.Permissions = per;
    }
    await this.roleRepository.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteRole(id: number): Promise<string> {
    await this.roleRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
