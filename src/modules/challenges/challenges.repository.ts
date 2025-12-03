import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateChallengeDto  } from "./dto/create-challenge.dto";
import { GetChallengesDto  } from "./dto/get-challenges.dto";
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

async getChallenges ( query : GetChallengesDto){
  const {page = 1 , limit = 10 , type , difficulty } = query ; 
  const skip = limit * (page - 1)

  const where : any = {}

   if(type) where.type = type
   if(difficulty) where.difficulty = difficulty


   const [challnges , total] = await Promise.all([
    this.prisma.challenge.findMany({
      where,
      skip,
      take : limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        subTitle: true,
        description: true,
        type: true,
        points: true,
        difficulty: true,
        createdAt: true,
        updatedAt: true,
        hints: true,
    },

    }),
    this.prisma.challenge.count({ where }),
   ])

   return {
    data : challnges ,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
   }
}


}