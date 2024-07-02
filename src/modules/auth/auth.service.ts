import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountEmployeeService } from '../accountEmp/accountEmployee.service';
import { LoginAccountEmployeeDto } from '../accountEmp/dto/request/login-accountEmployee.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginAccountCusDto } from '../accountCus/dto/request/login-accountCus.dto';
import { AccountCusService } from '../accountCus/accountCus.service';

@Injectable()
export class AuthService {
  constructor(
    private accountEmployeeService: AccountEmployeeService,
    private accountCusService: AccountCusService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    loginDto: LoginAccountEmployeeDto,
  ): Promise<{ access_token: string }> {
    const user = await this.accountEmployeeService.findOne(loginDto);
    if (user?.username !== loginDto.username) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu không đúng');
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.roleId,
      CreateDateColumn: user.createdAt,
      UpdateDateColumn: user.updatedAt,
      DeleteDateColumn: user.deletedAt,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInCustomer(
    loginDto: LoginAccountCusDto,
  ): Promise<{ access_token: string }> {
    const user = await this.accountCusService.findOne(loginDto);
    const payload = {
      id: user.id,
      email: user.email,
      CreateDateColumn: user.createdAt,
      UpdateDateColumn: user.updatedAt,
      DeleteDateColumn: user.deletedAt,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
