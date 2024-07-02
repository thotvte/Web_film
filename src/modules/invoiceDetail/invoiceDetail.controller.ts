import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InvoiceDetailService } from './invoiceDetail.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/invoicedetail')
export class InvoiceDetailController {
  constructor(private invoiceDetailService: InvoiceDetailService) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  getInvoiceDetail(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.invoiceDetailService.getInvoiceDetail(id);
  }

  @UseGuards(AuthGuard)
  @Get('')
  getInvoiceDetails() {
    return this.invoiceDetailService.getInvoiceDetails();
  }
}
