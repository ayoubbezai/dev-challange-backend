import { IsString, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { ChallengeExists } from '../../challenges/validators/challenge-exists.validator';

export class AddSubmissionDto {
  @IsString()
  @IsNotEmpty({ message: 'Challenge ID is required' })
  @Validate(ChallengeExists, { message: 'Challenge does not exist' })
  challengeID: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  flag?: string;
}

export interface Submission {
  challengeId: string;
  userId: string;
  link?: string;
  status?: string;
  points?: number;
}