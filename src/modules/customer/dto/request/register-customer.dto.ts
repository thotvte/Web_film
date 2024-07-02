import { IsInt, IsOptional, IsString } from 'class-validator';

export class RegisterCustomerDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  birthDate: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsInt()
  accountCusId: number;
}
