import { IsOptional, IsString } from 'class-validator';

export class UpdatePassWorkDto {
  @IsOptional()
  @IsString()
  oldPassword: string;

  @IsOptional()
  @IsString()
  newPassword: string;

  @IsOptional()
  @IsString()
  confirmPassword: string;
}
