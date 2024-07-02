import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { UpdateProfileMeDto } from './dto/request/update-profile.dto';
import { AccountCus } from 'src/entities/accountCus.entity';
import { RegisterCustomerDto } from './dto/request/register-customer.dto';
import { UpdatePassWorkDto } from './dto/request/update-passWord.dto';
import { updatePassWordCustomerDto } from './dto/request/update-passWorkCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(AccountCus)
    private accountCusRepository: Repository<AccountCus>,
  ) {}

  async getCustomer(id: number) {
    const result = await this.customerRepository.findOne({
      where: { id },
      relations: ['accountCus', 'invoices'],
    });
    return result;
  }

  async getCustomerMe(accountCusId: number) {
    const result = await this.customerRepository.findOne({
      where: { accountCusId: accountCusId },
      relations: ['accountCus', 'invoices', 'invoices.invoiceDetails'],
    });
    return result;
  }

  async getCustomers() {
    return this.customerRepository.find({
      relations: ['accountCus', 'invoices', 'invoices.invoiceDetails'],
    });
  }

  async register(registerCustomerDto: RegisterCustomerDto): Promise<string> {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      city,
      country,
    } = registerCustomerDto;
    const newAccountCus = await this.accountCusRepository.create({
      username,
      password,
      email,
    });
    if (registerCustomerDto.confirmPassword !== newAccountCus.password) {
      throw new BadRequestException(
        `mật khẩu và và nhập lại mật khẩu không trùng nhau`,
      );
    }
    const existingUser = await this.accountCusRepository.findOne({
      where: { username: newAccountCus.username },
    });
    if (existingUser) {
      throw new ConflictException('Tài khoản này đã tồn tại trong hệ thống.');
    }
    const savedAccountCus = await this.accountCusRepository.save(newAccountCus);
    const newCustomer = await this.customerRepository.create({
      accountCusId: savedAccountCus.id,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      city,
      country,
    });
    await this.customerRepository.save(newCustomer);
    return 'Đã đăng kí thành công ';
  }

  async updateProfileMe(id: number, data: UpdateProfileMeDto): Promise<string> {
    const getId = await this.customerRepository.findOne({
      where: { accountCusId: id },
    });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy Customer với id ${id}`);
    }
    const update = this.customerRepository.merge(getId, data);
    await this.customerRepository.save(update);
    console.log(update);
    return 'đã cập nhật hồ sơ thành công';
  }

  async updatePassWordMe(id: number, data: UpdatePassWorkDto): Promise<string> {
    const { oldPassword, newPassword, confirmPassword } = data;
    const getId = await this.accountCusRepository.findOne({
      where: { id },
    });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy Khách hàng với id ${id}`);
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
    const update = this.accountCusRepository.merge(getId, {
      password: data.newPassword,
    });
    await this.accountCusRepository.save(update);
    return 'đã cập nhật mật khẩu thành công';
  }

  async updatePassWord(
    id: number,
    data: updatePassWordCustomerDto,
  ): Promise<string> {
    const update = await this.accountCusRepository.findOne({
      where: { id },
    });
    const save = this.accountCusRepository.merge(update, {
      password: data.newPassword,
    });
    await this.accountCusRepository.save(save);
    return 'Đả cập nhật mật khẩu thành công ';
  }

  async deleteCustomer(id: number): Promise<string> {
    await this.customerRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
