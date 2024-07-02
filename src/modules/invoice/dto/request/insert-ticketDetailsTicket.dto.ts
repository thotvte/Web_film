import { IsInt, IsOptional } from 'class-validator';

export class InsertInvoiceTicketDetailsDto {
  @IsOptional()
  @IsInt()
  invoiceId: number;

  @IsOptional()
  @IsInt()
  ticketId: number;
}
