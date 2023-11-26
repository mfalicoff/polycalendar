// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
