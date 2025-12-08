import { Module } from '@nestjs/common';
import { SubmitionsController } from './submitions.controller';
import { SubmitionsService } from './submitions.service';
import { ChallengesRepository } from '../challenges/challenges.repository';
import { ChallengeExists } from '../challenges/validators/challenge-exists.validator';
import { PrismaService } from "../../database/prisma.service";
import {ChallengesModule} from '../challenges/challenges.module'
import {SubmitionsRepository} from './submitions.repository'
@Module({
    imports: [ChallengesModule], 
  controllers: [SubmitionsController],
  providers: [SubmitionsService , ChallengesRepository ,SubmitionsRepository, ChallengeExists , PrismaService],
  
})
export class SubmitionsModule {}
