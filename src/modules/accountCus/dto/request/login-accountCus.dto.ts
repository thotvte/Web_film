import { IsString } from 'class-validator';

export class LoginAccountCusDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
