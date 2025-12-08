import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./modules/users/users.module"
import { AuthModule } from './modules/auth/auth.module';

import { ChallengesModule } from './modules/challenges/challenges.module';
import { SubmitionsModule } from './modules/submitions/submitions.module';
@Module({
  imports: [UsersModule, AuthModule, ChallengesModule, SubmitionsModule ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
