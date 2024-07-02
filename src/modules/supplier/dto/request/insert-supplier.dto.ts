import { IsOptional, IsString } from 'class-validator';

export class InsertSupplierDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  company: string;
}
