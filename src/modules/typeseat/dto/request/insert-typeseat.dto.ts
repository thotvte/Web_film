import { IsInt, IsOptional, IsString } from 'class-validator';

export class InsertTypeSeatDto {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsInt()
  status: number;
}
