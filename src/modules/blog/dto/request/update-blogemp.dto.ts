import { IsArray, IsString } from 'class-validator';

export class UpdateBlogEmpDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  movieIds: number[];
}
