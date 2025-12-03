import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { Prisma , Challenge } from "@prisma/client";

@Injectable()
export class ChallengesRepository {
  constructor(private readonly prisma: PrismaService) {}

async createChallenge(data: CreateChallengeDto) {
  const prismaData = {
    ...data,
    hints: data.hints ? data.hints.map(h => ({ ...h })) : undefined,
  };

  return this.prisma.challenge.create({ data: prismaData });
}


}