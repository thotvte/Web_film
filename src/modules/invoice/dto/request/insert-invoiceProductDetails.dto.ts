import { IsInt, IsOptional } from 'class-validator';

export class InsertInvoiceProductDetailsDto {
  @IsOptional()
  @IsInt()
  invoiceId: number;

  @IsOptional()
  @IsInt()
  productId: number;

  @IsOptional()
  @IsInt()
  quantity: number;
}
