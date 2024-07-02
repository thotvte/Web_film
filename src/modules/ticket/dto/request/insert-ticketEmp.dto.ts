import { IsInt, IsOptional } from 'class-validator';

export class InsertTickeEmptDto {
  @IsOptional()
  @IsInt()
  schedulesId: number;

  @IsOptional()
  @IsInt()
  seatId: number;
}
