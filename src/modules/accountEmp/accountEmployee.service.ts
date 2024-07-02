import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEmployee } from 'src/entities/accountEmp.entity';
import { In, Repository } from 'typeorm';
import { InsertAccountEmployeeDto } from './dto/request/insert-accountEmployee.dto';
import { InsertAccountEmployeeResponse } from './dto/response/insert-accountEmployee.dto';
import { Role } from 'src/entities/role.entity';
import { UpdateAccountEmployeeDto } from './dto/request/update_accountEmployee.dto';
import { LoginAccountEmployeeDto } from './dto/request/login-accountEmployee.dto';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class AccountEmployeeService {
  constructor(
    @InjectRepository(AccountEmployee)
    private accountEmpReponsitory: Repository<AccountEmployee>,
    @InjectRepository(Role)
    private roleReponsitory: Repository<Role>,
    @InjectRepository(Permission)
    private permissionReponsitory: Repository<Permission>,
  ) {}

  async getAccountEmp(id: number) {
    const result = await this.accountEmpReponsitory.findOne({
      where: { id },
      relations: ['role', 'permissions'],
    });
    console.log(result);
    return result;
  }

  async getAccountEmps() {
    return this.accountEmpReponsitory.find({
      relations: ['role', 'permissions'],
    });
  }

  async addAccountEmp(
    data: InsertAccountEmployeeDto,
  ): Promise<InsertAccountEmployeeResponse> {
    const { permissionIds, roleId, ...rest } = data;
    const newAddAccountEmp = this.accountEmpReponsitory.create(rest);
    const role = await this.roleReponsitory.findOne({
      where: { id: roleId },
    });
    const per = await this.permissionReponsitory.find({
      where: { id: In(permissionIds) },
    });
    newAddAccountEmp.role = role;
    newAddAccountEmp.permissions = per;
    const saveAccountEmp =
      await this.accountEmpReponsitory.save(newAddAccountEmp);
    return saveAccountEmp;
  }

  async updateAccountEmp(
    id: number,
    data: InsertAccountEmployeeDto,
  ): Promise<string> {
    const getId = await this.accountEmpReponsitory.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy AccountEmp với id ${id}`);
    }
    const update = this.accountEmpReponsitory.merge(getId, data);
    if (data.roleId) {
      const role = await this.roleReponsitory.findOne({
        where: { id: data.roleId },
      });
      update.role = role;
    }
    if (data.permissionIds) {
      const per = await this.permissionReponsitory.find({
        where: { id: In(data.permissionIds) },
      });

      update.permissions = per;
    }
    await this.accountEmpReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteAccountEmp(id: number): Promise<string> {
    await this.accountEmpReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }

  async updateAccountEmpMe(
    id: number,
    data: UpdateAccountEmployeeDto,
  ): Promise<string> {
    const getId = await this.accountEmpReponsitory.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy AccountEmp với id ${id}`);
    }
    const update = this.accountEmpReponsitory.merge(getId, data);
    await this.accountEmpReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async findOne(loginDto: LoginAccountEmployeeDto): Promise<AccountEmployee> {
    const user = await this.accountEmpReponsitory.findOne({
      where: { username: loginDto.username, password: loginDto.password },
    });
    return user;
  }
}
