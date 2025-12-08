import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ChallengesRepository } from '../challenges.repository';

@ValidatorConstraint({ async: true })
@Injectable()  // <-- this is required so Nest can inject services
export class ChallengeExists implements ValidatorConstraintInterface {
  constructor(private readonly challengesRepository: ChallengesRepository) {}

  async validate(challengeId: string) {
    if (!challengeId) return false;

    const challenge = await this.challengesRepository.findById(challengeId);
    return !!challenge;
  }

  defaultMessage() {
    return 'Challenge does not exist';
  }
}
