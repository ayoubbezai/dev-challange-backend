import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { SubmitionsModule } from './modules/submitions/submitions.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ChallengesModule,
    SubmitionsModule,

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,   // 60 seconds
          limit: 10, // max 10 requests per 60 sec
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
