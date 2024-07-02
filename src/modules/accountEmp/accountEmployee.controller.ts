import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AccountEmployeeService } from './accountEmployee.service';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';

@Controller('/accountemployee')
export class AccountEmployeeController {
  constructor(private accountEmpService: AccountEmployeeService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  getAccountEmployee(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.accountEmpService.getAccountEmp(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('')
  getAccountEmployees() {
    return this.accountEmpService.getAccountEmps();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteAccountEmployee(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.accountEmpService.deleteAccountEmp(id);
  }
}
