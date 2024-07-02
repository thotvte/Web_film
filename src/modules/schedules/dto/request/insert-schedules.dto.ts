import { IsInt, IsOptional } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class InsertSchedulesDto {
  @IsOptional()
  @IsInt()
  movieId: number;

  @IsOptional()
  @IsInt()
  cinemaId: number;

  @IsOptional()
  @CreateDateColumn()
  startTime: Date;

  @IsOptional()
  @CreateDateColumn()
  endTime: Date;

  @IsOptional()
  @IsInt()
  status: number;
}
