import {  IsNotEmpty, IsString, IsOptional, Validate } from 'class-validator';
import {ParticipantExists} from '../validators/submission-exists.validator'

export class EditParticipantDto {
      @IsString()
      @IsNotEmpty({ message: 'user ID is required' })
      @Validate(ParticipantExists, { message: 'user does not exist' })
      userID: string;
  

    @IsString()
    @IsOptional()
    points?: number;
}
