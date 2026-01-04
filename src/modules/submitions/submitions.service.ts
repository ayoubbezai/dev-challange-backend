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
import { SubmissionResource } from './submission.resource';
import { EditSubmissionDto } from './dto/edit-submition.dto';
import { ObjectId } from 'bson';

@Injectable()
export class SubmitionsService {
  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly submitionsRepository: SubmitionsRepository,
    private readonly prisma: PrismaService,
  ) {}

  private validateObjectId(id: string, name: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ${name}`);
    }
  }

  async addSubmission(dto: AddSubmissionDto, userIdFromJwt: string) {

      return { success: false, message: 'Dev Challenges end'};


    // if (!dto.challengeID) {
    //   throw new BadRequestException('Challenge ID is required');
    // }
    // if (!userIdFromJwt) {
    //   throw new BadRequestException('User ID is required');
    // }

    // this.validateObjectId(userIdFromJwt, 'userId');
    // this.validateObjectId(dto.challengeID, 'challengeId');

    // const challenge = await this.challengesRepository.findById(dto.challengeID);
    // if (!challenge) {
    //   throw new NotFoundException('Challenge not found');
    // }



    // // ===== CTF FLOW =====
    // if (challenge.type === 'ctf') {
    //   if (!challenge.flagHash) {
    //     throw new NotFoundException('Challenge flag does not exist');
    //   }
    //   if (!dto.flag) {
    //     throw new BadRequestException('Flag is required');
    //   }

    //   const submissionExists =
    //     await this.submitionsRepository.findByUserAndChallenge({
    //       userId: userIdFromJwt,
    //       challengeId: dto.challengeID,
    //     });

    //   if (submissionExists) {
    //     throw new ConflictException('You already submitted this CTF');
    //   }

    //   const isMatch = await compare(dto.flag, challenge.flagHash);
    //   if (!isMatch) {
    //     throw new BadRequestException('Wrong flag');
    //   }

    //   await this.prisma.$transaction([
    //     this.prisma.submition.create({
    //       data: {
    //         userId: userIdFromJwt,
    //         challengeId: dto.challengeID,
    //         status: 'accepted',
    //         points: challenge.points ?? 0,
    //       },
    //     }),
    //     this.prisma.user.update({
    //       where: { id: userIdFromJwt },
    //       data: {
    //         points: { increment: challenge.points ?? 0 },
    //       },
    //     }),
    //   ]);

    //   return { success: true, message: 'Correct flag', status: 'accepted' };
    // }

    // // ===== NON-CTF FLOW =====
    // const previousSubmissionsCount =
    //   await this.submitionsRepository.countByUserAndChallenge({
    //     userId: userIdFromJwt,
    //     challengeId: dto.challengeID,
    //   });

    // if (previousSubmissionsCount >= 3) {
    //   throw new ConflictException('Maximum 3 submissions allowed');
    // }

    // await this.submitionsRepository.addSubmition({
    //   userId: userIdFromJwt,
    //   challengeId: dto.challengeID,
    //   status: 'pending',
    //   points: 0,
    //   link: dto.link,
    // });

    // return {
    //   success: true,
    //   message: 'Submission added',
    //   status: 'pending',
    //   data: challenge,
    // };
  }

  async getSubmitions() {
    const submissions = await this.submitionsRepository.findAll();
    return {
      success: true,
      message: 'Submission fetched',
      data: SubmissionResource.toCollection(submissions),
    };
  }

  async editSubmition(dto: EditSubmissionDto) {
    const updated = await this.submitionsRepository.editSubmition(dto);

    if (!updated) {
      throw new NotFoundException('Submission not found');
    }

    return {
      success: true,
      message: 'Submission updated successfully',
      data: updated,
    };
  }
}
