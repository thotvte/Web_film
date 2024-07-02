import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProfileEmployeeMeDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  birthDate: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  salary: number;

  @IsOptional()
  @IsString()
  hireDate: string;

  @IsOptional()
  @IsInt()
  accountEmployeeId: number;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  country: string;
}
