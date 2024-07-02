import { IsArray, IsOptional, IsString } from 'class-validator';

export class InsertAccountEmployeeDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  roleId: number;

  @IsArray()
  permissionIds: number[];
}
