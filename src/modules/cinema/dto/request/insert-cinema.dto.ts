import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class InsertCinemaDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  numberOfSeats: number;

  @IsOptional()
  @IsInt()
  status: number;

  @IsOptional()
  @IsArray()
  seatIds: number[];

  @IsOptional()
  @IsArray()
  scheduleIds: number[];
}
