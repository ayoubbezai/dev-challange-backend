import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { PrismaService } from "../../database/prisma.service";
import {ChallengesRepository} from './challenges.repository'
@Module({
  controllers: [ChallengesController],
  providers: [ChallengesService , ChallengesRepository,PrismaService],
  exports: [ ChallengesRepository],
  
})
export class ChallengesModule {}
