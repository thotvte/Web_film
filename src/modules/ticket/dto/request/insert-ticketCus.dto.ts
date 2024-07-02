import { IsInt, IsOptional } from 'class-validator';

export class InsertTicketCusDto {
  @IsOptional()
  @IsInt()
  schedulesId: number;

  @IsOptional()
  @IsInt()
  seatId: number;
}
