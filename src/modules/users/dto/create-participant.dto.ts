import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import sanitizeHtml from 'sanitize-html';

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

  constructor(partial: Partial<CreateParticipantDto>) {
    Object.assign(this, partial);

    // sanitize and return string
    this.full_name = sanitizeHtml(this.full_name);
    this.nick_name = sanitizeHtml(this.nick_name);
    this.email = sanitizeHtml(this.email);
  }
}
