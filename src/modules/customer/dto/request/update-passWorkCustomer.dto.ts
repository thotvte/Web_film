import { IsOptional, IsString } from 'class-validator';

export class updatePassWordCustomerDto {
  @IsOptional()
  @IsString()
  newPassword: string;
}
