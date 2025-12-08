import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { PrismaService } from "../../database/prisma.service";
import { ChallengesRepository } from './challenges.repository';
import { ChallengeExists } from './validators/challenge-exists.validator';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesRepository, ChallengeExists, PrismaService],
  exports: [ChallengesRepository, ChallengesService, ChallengeExists],
})
export class ChallengesModule {}

