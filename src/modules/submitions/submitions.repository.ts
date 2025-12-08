import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import {Submission , AddPoints} from './types'
@Injectable()
export class SubmitionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addSubmition (data : Submission){
    const submitedData = {
      challengeId : data.challengeId,
      userId : data.userId,
      link : data.link ,
      status : data.status || 'pending',
      points : data.points || 0 
    }
    return this.prisma.submition.create({ data: submitedData })
  }

 async addPoints(data: AddPoints) {
    if (!data.userId) {
      throw new NotFoundException('User ID is required');
    }

    return this.prisma.user.update({
      where: { id: data.userId },
      data: {
        points: {
          increment: data.points || 0,
        },
      },
    });
  }

    async findByUserAndChallenge(params: { userId: string; challengeId: string }) {
    return this.prisma.submition.findFirst({
      where: {
        userId: params.userId,
        challengeId: params.challengeId,
      },
    });
  }

  // Optional: find all submissions by a user
  async findByUser(userId: string) {
    return this.prisma.submition.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Optional: find all submissions for a challenge
  async findByChallenge(challengeId: string) {
    return this.prisma.submition.findMany({
      where: { challengeId },
      orderBy: { createdAt: 'desc' },
    });
  }
  async countByUserAndChallenge({ userId, challengeId }: { userId: string; challengeId: string }): Promise<number> {
  return this.prisma.submition.count({
    where: { userId, challengeId },
  });
}

}