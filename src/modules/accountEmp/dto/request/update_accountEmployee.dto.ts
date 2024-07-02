import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountEmployeeDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  email: string;
}
