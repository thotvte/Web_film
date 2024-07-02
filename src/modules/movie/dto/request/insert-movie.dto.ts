import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class InsertMovieDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  Content: string;

  @IsOptional()
  @IsString()
  actors: string;

  @IsOptional()
  @IsString()
  ageRating: string;

  @IsOptional()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  status: number;

  @IsOptional()
  @IsArray()
  genreIds: number[];

  @IsOptional()
  @IsArray()
  scheduleIds: number[];
}
