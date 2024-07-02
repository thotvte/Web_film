import { IsInt, IsOptional } from 'class-validator';

export class InsertDeliveryBillDetailDto {
  @IsOptional()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsInt()
  unitPrice: number;

  @IsOptional()
  @IsInt()
  deliveryBillId: number;

  @IsOptional()
  @IsInt()
  productItemId: number;
}
