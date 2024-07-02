import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class InsertProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  price: number;

  @IsOptional()
  @IsArray()
  productItemIds: number[];

  @IsOptional()
  @IsInt()
  status: number;
}
