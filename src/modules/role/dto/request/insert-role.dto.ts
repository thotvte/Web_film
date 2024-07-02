import { IsArray, IsOptional, IsString } from 'class-validator';

export class InsertRoleDto {
  @IsOptional()
  @IsString()
  roleName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  permissionIds: number[];
}
