import { IsEmail, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Matches(/^[^$<>]{1,200}$/)
  email: string;

  @IsString()
  @Matches(/^[^$<>]{1,200}$/)
  password: string;
}
