import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { InsertEmployeeDto } from './dto/request/insert-employee.dto';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { RolesGuard } from '../authorization/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import { updatePassWordCustomerDto } from '../customer/dto/request/update-passWorkCustomer.dto';
import { UpdateProfileEmployeeMeDto } from './dto/request/update-profileMe.dto';
import { UpdatePassWorkMeDto } from './dto/request/update-passWordMe.dto';

@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('/me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  async getAccountEmployeeMe(@Req() req: any) {
    const userId = req.user.id;
    const accountEmployee = await this.employeeService.getEmployeeMe(userId);
    return accountEmployee;
  }

  @Get('/:id')
  @Roles(Role.Admin)
  getEmployee(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.employeeService.getEmployee(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get('')
  getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Roles(Role.Admin)
  @Post('')
  insertSeat(@Body() body: InsertEmployeeDto) {
    return this.employeeService.addEmployee(body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put('/profile/me')
  UpdateProfileMe(
    @Body() updateCustomerMeDto: UpdateProfileEmployeeMeDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.employeeService.updateProfileMe(userId, updateCustomerMeDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Put('/passwork/me')
  @UseGuards(AuthGuard)
  UpdatePassWorkMe(
    @Body() updatePassWork: UpdatePassWorkMeDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.employeeService.updatePassWorkMe(userId, updatePassWork);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put('/passwork/:id')
  @UseGuards(AuthGuard)
  UpdatePassWork(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() updatePassWork: updatePassWordCustomerDto,
  ) {
    return this.employeeService.updatePassWork(id, updatePassWork);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async deleteEmployee(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.employeeService.deleteEmployee(id);
  }
}
