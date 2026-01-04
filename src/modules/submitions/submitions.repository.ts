import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Submission, AddPoints } from './types';
import { EditSubmissionDto } from './dto/edit-submition.dto';
import { ObjectId } from 'bson';

@Injectable()
export class SubmitionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private validateObjectId(id: string, name: string) {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ${name}`);
    }
  }

  async addSubmition(data: Submission) {
    this.validateObjectId(data.userId, 'userId');
    this.validateObjectId(data.challengeId, 'challengeId');

    return this.prisma.submition.create({
      data: {
        userId: data.userId,
        challengeId: data.challengeId,
        link: data.link,
        status: data.status ?? 'pending',
        points: data.points ?? 0,
      },
    });
  }

  async addPoints(data: AddPoints) {
    this.validateObjectId(data.userId, 'userId');

    return this.prisma.user.update({
      where: { id: data.userId },
      data: {
        points: {
          increment: data.points ?? 0,
        },
      },
    });
  }

  async findByUserAndChallenge(params: { userId: string; challengeId: string }) {
    this.validateObjectId(params.userId, 'userId');
    this.validateObjectId(params.challengeId, 'challengeId');

    return this.prisma.submition.findFirst({
      where: {
        userId: params.userId,
        challengeId: params.challengeId,
      },
    });
  }

  async findByUser(userId: string) {
    this.validateObjectId(userId, 'userId');

    return this.prisma.submition.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(submitionId: string) {
    this.validateObjectId(submitionId, 'submissionId');

    return this.prisma.submition.findUnique({
      where: { id: submitionId },
    });
  }

  async findByChallenge(challengeId: string) {
    this.validateObjectId(challengeId, 'challengeId');

    return this.prisma.submition.findMany({
      where: { challengeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async countByUserAndChallenge({
    userId,
    challengeId,
  }: {
    userId: string;
    challengeId: string;
  }): Promise<number> {
    this.validateObjectId(userId, 'userId');
    this.validateObjectId(challengeId, 'challengeId');

    return this.prisma.submition.count({
      where: { userId, challengeId },
    });
  }

  async findAll() {
  // 1. Get submissions ONLY
  const submissions = await this.prisma.submition.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (!submissions.length) return [];

  // 2. Collect IDs
  const userIds = [...new Set(submissions.map(s => s.userId))];
  const challengeIds = [...new Set(submissions.map(s => s.challengeId))];

  // 3. Fetch related docs safely
  const users = await this.prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      full_name: true,
      nick_name: true,
      email: true,
    },
  });

  const challenges = await this.prisma.challenge.findMany({
    where: { id: { in: challengeIds } },
    select: {
      id: true,
      title: true,
      subTitle: true,
      points: true,
      type: true,
    },
  });

  // 4. Index them
  const usersMap = new Map(users.map(u => [u.id, u]));
  const challengesMap = new Map(challenges.map(c => [c.id, c]));

  // 5. Attach relations safely (null allowed)
  return submissions.map(s => ({
    ...s,
    user: usersMap.get(s.userId) ?? null,
    challenge: challengesMap.get(s.challengeId) ?? null,
  }));
}


  async editSubmition({ SubmissionID, status, points }: EditSubmissionDto) {
    this.validateObjectId(SubmissionID, 'submissionId');

    return this.prisma.submition.update({
      where: { id: SubmissionID },
      data: {
        status,
        points,
      },
    });
  }
}
