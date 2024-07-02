import { IsArray, IsOptional, IsString } from 'class-validator';

export class InsertPermissionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  roleIds: number[];

  @IsOptional()
  @IsArray()
  accountEmpIds: number[];
}
