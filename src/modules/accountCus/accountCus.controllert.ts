import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AccountCusService } from './accountCus.service';
import { RolesGuard } from '../authorization/roles.guard';
import { Role } from '../authorization/role.enum';
import { Roles } from '../authorization/roles.decorator';

@Controller('/accountcustomer')
export class AccountCusController {
  constructor(private accountCusService: AccountCusService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('/:id')
  getAccountCus(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.accountCusService.getAccountCus(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get()
  getAccountCuss() {
    return this.accountCusService.getAccountCuss();
  }
}
