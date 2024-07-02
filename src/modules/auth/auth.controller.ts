import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LoginAccountEmployeeDto } from '../accountEmp/dto/request/login-accountEmployee.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.setmetadata';
import { LoginDto } from './dto/request/login.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('employee/login')
  signInEmployee(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('customer/login')
  signInCustomer(@Body() signInDto: LoginDto) {
    return this.authService.signInCustomer(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
  @Public()
  @Get()
  findAll() {
    return [];
  }
}
