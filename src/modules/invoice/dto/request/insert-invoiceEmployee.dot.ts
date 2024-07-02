import { IsArray, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { InsertInvoiceProductDetailsDto } from './insert-invoiceProductDetails.dto';
import { Type } from 'class-transformer';
import { InsertInvoiceTicketDetailsDto } from './insert-ticketDetailsTicket.dto';

export class InsertInvoiceEmployeeDto {
  @IsOptional()
  @IsInt()
  discount: number;

  @IsOptional()
  @IsInt()
  customerId: number;

  @IsInt()
  employeeId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InsertInvoiceProductDetailsDto)
  productItems: InsertInvoiceProductDetailsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InsertInvoiceTicketDetailsDto)
  ticketItems: InsertInvoiceTicketDetailsDto[];
}
