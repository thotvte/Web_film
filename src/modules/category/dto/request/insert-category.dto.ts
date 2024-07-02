import { IsOptional, IsString } from 'class-validator';

export class InsertCategoryDto {
  @IsOptional()
  @IsString()
  name: string;
}
