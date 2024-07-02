import { IsOptional, IsString } from 'class-validator';

export class UpdatePassWorkMeDto {
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
