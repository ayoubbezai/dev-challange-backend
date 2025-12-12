import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SubmitionsRepository } from '../submitions.repository';

@ValidatorConstraint({ async: true })
@Injectable() 
export class SubmissionExists implements ValidatorConstraintInterface {
  constructor(private readonly submitionsRepository: SubmitionsRepository) {}

  async validate(submitionsId: string) {
    if (!submitionsId) return false;

    const submition = await this.submitionsRepository.findById(submitionsId);
    return !!submition;
  }

  defaultMessage() {
    return 'Submission does not exist';
  }
}
