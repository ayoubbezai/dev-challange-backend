import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  nick_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  
}
