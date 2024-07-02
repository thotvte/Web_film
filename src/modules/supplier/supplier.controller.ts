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
import { SupplierService } from './supplier.service';
import { InsertSupplierDto } from './dto/request/insert-supplier.dto';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../authorization/role.enum';
import { Public } from '../auth/auth.setmetadata';

@Controller('/supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Public()
  @Get('/:id')
  getSupplier(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.supplierService.getSupplier(id);
  }

  @Public()
  @Get()
  getSuppliers() {
    return this.supplierService.getSuppliers();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  insertSupplier(@Body() body: InsertSupplierDto) {
    return this.supplierService.addSupplier(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateSupplier(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertSupplierDto,
  ) {
    return this.supplierService.updateSupplier(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteSupplier(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.supplierService.deleteSupplier(id);
  }
}
