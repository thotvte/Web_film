import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountCus } from 'src/entities/accountCus.entity';
import { Repository } from 'typeorm';
import { LoginAccountCusDto } from './dto/request/login-accountCus.dto';

@Injectable()
export class AccountCusService {
  constructor(
    @InjectRepository(AccountCus)
    private accountCusRepository: Repository<AccountCus>,
  ) {}

  async getAccountCus(id: number) {
    const result = await this.accountCusRepository.findOne({
      where: { id },
    });
    return result;
  }

  async getAccountCuss() {
    return this.accountCusRepository.find();
  }

  async findOne(loginDto: LoginAccountCusDto): Promise<AccountCus | undefined> {
    const user = await this.accountCusRepository.findOne({
      where: { username: loginDto.username },
    });
    if (user.password === loginDto.password) {
      return user;
    }
  }
}
