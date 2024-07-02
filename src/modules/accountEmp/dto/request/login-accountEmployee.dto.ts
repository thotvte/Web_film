import { IsString } from 'class-validator';

export class LoginAccountEmployeeDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
