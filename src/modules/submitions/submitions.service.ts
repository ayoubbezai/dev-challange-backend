import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AddSubmissionDto } from './dto/add-submition.dto';
import { ChallengesRepository } from '../challenges/challenges.repository';
import { SubmitionsRepository } from './submitions.repository';
import { compare } from 'bcryptjs';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SubmitionsService {
  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly submitionsRepository: SubmitionsRepository,
    private readonly prisma: PrismaService,
  ) {}

  async addSubmission(dto: AddSubmissionDto, userIdFromJwt: string) {
    if (!dto.challengeID) {
      throw new BadRequestException({ success: false, message: 'Challenge ID is required', status: 'error' });
    }
    if (!userIdFromJwt) {
      throw new BadRequestException({ success: false, message: 'User ID is required', status: 'error' });
    }

    const challenge = await this.challengesRepository.findById(dto.challengeID);
    if (!challenge) {
      throw new NotFoundException({ success: false, message: 'Challenge not found', status: 'error' });
    }

    // CTF challenge flow
    if (challenge.type === 'ctf') {
      if (!challenge.flagHash) {
        throw new NotFoundException({ success: false, message: 'Challenge flag does not exist', status: 'error' });
      }
      if (!dto.flag) {
        throw new BadRequestException({ success: false, message: 'Flag is required', status: 'error' });
      }

      const submissionExists = await this.submitionsRepository.findByUserAndChallenge({
        userId: userIdFromJwt,
        challengeId: dto.challengeID,
      });
      if (submissionExists) {
        throw new ConflictException({ success: false, message: 'You already submitted this CTF', status: 'error' });
      }

      const isMatch = await compare(dto.flag, challenge.flagHash);
      if (!isMatch) {
        throw new BadRequestException({ success: false, message: 'Wrong flag', status: 'error' });
      }

      // Transaction: create submission + add points
      await this.prisma.$transaction(async (tx) => {
        await tx.submition.create({
          data: {
            userId: userIdFromJwt,
            challengeId: dto.challengeID,
            status: 'accepted',
            points: challenge.points || 0,
          },
        });

        await tx.user.update({
          where: { id: userIdFromJwt },
          data: { points: { increment: challenge.points || 0 } },
        });
      });

      return { success: true, message: 'Correct flag', status: 'accepted' };
    }

    // Non-CTF submission flow: limit to 3 submissions
    const previousSubmissionsCount = await this.submitionsRepository.countByUserAndChallenge({
      userId: userIdFromJwt,
      challengeId: dto.challengeID,
    });

    if (previousSubmissionsCount >= 3) {
      throw new ConflictException({ success: false, message: 'Maximum 3 submissions allowed', status: 'rejected' });
    }

    await this.submitionsRepository.addSubmition({
      userId: userIdFromJwt,
      challengeId: dto.challengeID,
      status: 'pending',
      points: 0,
      link: dto.link,
    });

    return {
      success: true,
      message: 'Submission added',
      status: 'pending',
      data: challenge,
    };
  }
}
