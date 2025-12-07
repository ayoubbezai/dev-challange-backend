import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./modules/users/users.module"
import { AuthModule } from './modules/auth/auth.module';

import { ChallengesModule } from './modules/challenges/challenges.module';
@Module({
  imports: [UsersModule, AuthModule, ChallengesModule ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
