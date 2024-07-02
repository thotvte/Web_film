import { IsInt, IsOptional, IsString } from 'class-validator';

export class InsertPTSSDto {
  @IsOptional()
  @IsString()
  timeSlot: string;

  @IsOptional()
  @IsInt()
  price: number;

  @IsOptional()
  @IsInt()
  SeatId: number;

  @IsOptional()
  @IsInt()
  schedulesId: number;
}
