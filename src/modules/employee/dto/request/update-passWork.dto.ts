import { IsOptional, IsString } from 'class-validator';

export class updatePassWordEmployeeDto {
  @IsOptional()
  @IsString()
  newPassword: string;
}
