import { IsInt, IsOptional, IsString } from 'class-validator';

export class InsertEmployeeDto {
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
  salary: number;

  @IsString()
  hireDate: string;

  @IsOptional()
  @IsInt()
  accountEmployeeId: number;

  @IsInt()
  roleId: number;

  @IsString()
  city: string;

  @IsString()
  country: string;
}
