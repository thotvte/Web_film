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
import { InvoiceService } from './invoice.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { InsertInvoiceEmployeeDto } from './dto/request/insert-invoiceEmployee.dot';
import { InsertInvoiceEmployeeResponse } from './dto/response/insert-invoiceEmployee.dto';
import { InsertInvoiceCustomerDto } from './dto/request/insert-invoiceCustomer.dto';
import { InsertInvoiceCustomerResponse } from './dto/response/insert-invoiceCustomer.dto';

@Controller('/invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  getInvoices() {
    return this.invoiceService.getInvoices();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  getInvoiceId(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.invoiceService.getInvoicesId(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/employee')
  addInvoiceEmployee(
    @Body() body: InsertInvoiceEmployeeDto,
  ): Promise<InsertInvoiceEmployeeResponse> {
    return this.invoiceService.addInvoiceEmployee(
      body,
      body.productItems,
      body.ticketItems,
    );
  }

  @UseGuards(AuthGuard)
  @Post('/customer')
  addInvoiceCustomer(
    @Body() body: InsertInvoiceCustomerDto,
  ): Promise<InsertInvoiceCustomerResponse> {
    return this.invoiceService.addInvoiceCustomer(
      body,
      body.productItems,
      body.ticketItems,
    );
  }

  @UseGuards(AuthGuard)
  @Put('/customer/save')
  saveInvoiceCustomer(
    @Body() body: InsertInvoiceCustomerDto,
  ): Promise<InsertInvoiceCustomerResponse> {
    return this.invoiceService.saveInvoiceCustomer(
      body,
      body.productItems,
      body.ticketItems,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/employee/save')
  saveInvoiceEmployee(
    @Body() body: InsertInvoiceEmployeeDto,
  ): Promise<InsertInvoiceCustomerResponse> {
    return this.invoiceService.saveInvoiceEmployee(
      body,
      body.productItems,
      body.ticketItems,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id/pay')
  async payInvoice(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.invoiceService.updateStatusInvoice(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id/cancel')
  async cancelInvoice(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.invoiceService.cancelStatusInvoice(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteInvoice(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.invoiceService.deleteInvoice(id);
  }
}
