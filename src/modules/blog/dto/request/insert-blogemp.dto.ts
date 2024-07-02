import { IsArray, IsInt, IsString } from 'class-validator';

export class InsertBlogEmpDto {
  @IsInt()
  cusId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  movieIds: number[];
}
