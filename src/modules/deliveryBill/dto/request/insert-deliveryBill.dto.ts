import { IsInt, IsOptional, IsString } from 'class-validator';

export class InsertDeliveryBillDto {
  @IsOptional()
  @IsString()
  reason: string;

  @IsOptional()
  @IsInt()
  employeeId: number;

  @IsOptional()
  @IsInt()
  status: number;
}
