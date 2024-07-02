import { IsInt } from 'class-validator';

export class UpdateStatusInvoiceDto {
  @IsInt()
  status: number;
}
