import {
  IsArray,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class InsertGenreDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  status: number;

  @IsOptional()
  @IsArray()
  movieIds: number[];
}
