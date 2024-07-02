import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';
import { InsertEmployeeDto } from './dto/request/insert-employee.dto';
import { AccountEmployee } from 'src/entities/accountEmp.entity';
import { UpdateProfileEmployeeMeDto } from './dto/request/update-profileMe.dto';
import { UpdatePassWorkMeDto } from './dto/request/update-passWordMe.dto';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { updatePassWordEmployeeDto } from './dto/request/update-passWork.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeReponsitory: Repository<Employee>,
    @InjectRepository(AccountEmployee)
    private accountEmployeeReponsitory: Repository<AccountEmployee>,
  ) {}

  async getEmployee(id: number) {
    const result = await this.employeeReponsitory.findOne({
      where: { id },
      relations: [
        'accountEmployee',
        'deliveryBills',
        'invoices',
        'invoices.invoiceDetails',
      ],
    });
    return result;
  }

  async getEmployeeMe(accountEmployeeId: number) {
    const result = await this.employeeReponsitory.findOne({
      where: { accountEmployeeId: accountEmployeeId },
      relations: [
        'accountEmployee',
        'deliveryBills',
        'invoices',
        'invoices.invoiceDetails',
      ],
    });
    return result;
  }

  async getEmployees() {
    return this.employeeReponsitory.find({
      relations: [
        'accountEmployee',
        'deliveryBills',
        'invoices',
        'invoices.invoiceDetails',
      ],
    });
  }

  async addEmployee(data: InsertEmployeeDto): Promise<string> {
    const {
      username,
      password,
      email,
      roleId,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      salary,
      hireDate,
      city,
      country,
    } = data;
    const newAccountEmp = await this.accountEmployeeReponsitory.create({
      username,
      password,
      email,
      roleId,
    });
    if (data.confirmPassword !== newAccountEmp.password) {
      throw new BadRequestException(
        `mật khẩu và và nhập lại mật khẩu không trùng nhau`,
      );
    }
    const existingUser = await this.accountEmployeeReponsitory.findOne({
      where: { username: newAccountEmp.username },
    });
    if (existingUser) {
      throw new ConflictException('Tài khoản này đã tồn tại trong hệ thống.');
    }
    const saveAccountEmp =
      await this.accountEmployeeReponsitory.save(newAccountEmp);
    const newEmployee = await this.employeeReponsitory.create({
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      salary,
      hireDate,
      accountEmployeeId: saveAccountEmp.id,
      city,
      country,
    });
    await this.employeeReponsitory.save(newEmployee);
    return 'Đã đăng kí thành công ';
  }

  async updateProfileMe(
    id: number,
    data: UpdateProfileEmployeeMeDto,
  ): Promise<string> {
    const getId = await this.employeeReponsitory.findOne({
      where: { accountEmployeeId: id },
    });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy employee với id ${id}`);
    }
    const update = this.employeeReponsitory.merge(getId, data);
    await this.employeeReponsitory.save(update);
    console.log(update);
    return 'đã cập nhật hồ sơ thành công';
  }

  async updatePassWorkMe(
    id: number,
    data: UpdatePassWorkMeDto,
  ): Promise<string> {
    const { oldPassword, newPassword, confirmPassword } = data;
    const getId = await this.accountEmployeeReponsitory.findOne({
      where: { id },
    });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy AccountCus với id ${id}`);
    }
    const oldpk = await this.accountEmployeeReponsitory.findOne({
      where: { password: oldPassword },
    });
    if (!oldpk) {
      throw new BadRequestException('Mật khẩu cũ của bạn không đúng');
    }
    if (oldPassword == newPassword) {
      throw new BadRequestException(
        'Mật khẩu mới không được trùng với mật khẩu cũ',
      );
    }
    if (newPassword !== confirmPassword) {
      throw new BadRequestException(
        'Mật khẩu và nhập lại mật khẩu không trùng nhau',
      );
    }
    const update = this.accountEmployeeReponsitory.merge(getId, {
      password: data.newPassword,
    });
    await this.accountEmployeeReponsitory.save(update);
    return 'đã cập nhật mật khẩu thành công';
  }

  async updateProFileMe(id: number, data: UpdateProfileDto): Promise<string> {
    const emp = await this.employeeReponsitory.findOne({ where: { id } });
    const update = await this.employeeReponsitory.merge(emp, data);
    await this.employeeReponsitory.save(update);
    return 'Đã cập nhật thành công';
  }

  async updatePassWork(
    id: number,
    data: updatePassWordEmployeeDto,
  ): Promise<string> {
    const emp = await this.accountEmployeeReponsitory.findOne({
      where: { id },
    });
    const update = await this.accountEmployeeReponsitory.merge(emp, {
      password: data.newPassword,
    });
    await this.accountEmployeeReponsitory.save(update);
    return 'Đã cập nhật thành công';
  }

  async deleteEmployee(id: number): Promise<string> {
    await this.employeeReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
