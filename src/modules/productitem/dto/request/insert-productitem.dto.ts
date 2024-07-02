import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class InsertProductItemDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsInt()
  rating: number;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsInt()
  supplierId: number;

  @IsOptional()
  @IsArray()
  productIds: number[];
}
