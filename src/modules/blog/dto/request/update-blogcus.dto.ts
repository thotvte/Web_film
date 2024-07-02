import { IsArray, IsString } from 'class-validator';

export class UpdateBlogCusDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  movieIds: number[];
}
