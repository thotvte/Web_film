import { IsInt, IsOptional, IsString } from 'class-validator';

export class InsertSeatDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  typeSeatId: number;

  @IsOptional()
  @IsString()
  rowName: string;

  @IsOptional()
  @IsString()
  columnName: string;

  @IsOptional()
  @IsInt()
  cinemaId: number;

  @IsOptional()
  @IsString()
  status: number;
}
