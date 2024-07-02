import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { InsertRoleDto } from './dto/request/insert-role.dto';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { RolesGuard } from '../authorization/roles.guard';

@Controller('/role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  getRole(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.roleService.getRole(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  insertRole(@Body() body: InsertRoleDto) {
    return this.roleService.addRole(body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateRole(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertRoleDto,
  ) {
    return this.roleService.updateRole(id, data);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteRole(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.roleService.deleteRole(id);
  }
}
