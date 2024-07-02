import { IsInt, IsOptional } from 'class-validator';

export class InsertInvoiceDetailDto {
  @IsOptional()
  @IsInt()
  productId: number;

  @IsOptional()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsInt()
  invoiceId: number;

  @IsOptional()
  @IsInt()
  supplierId: number;

}
