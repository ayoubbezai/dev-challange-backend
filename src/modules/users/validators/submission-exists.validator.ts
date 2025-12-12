import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsersRepository } from '../users.repository';

@ValidatorConstraint({ async: true })
@Injectable() 
export class ParticipantExists implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validate(userId: string) {
    if (!userId) return false;

    const user = await this.usersRepository.findById(userId);
    return !!user;
  }

  defaultMessage() {
    return 'User does not exist';
  }
}
