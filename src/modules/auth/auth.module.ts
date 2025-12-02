import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultsecret',
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRATION) || 3600 }, // 3600s = 1 hour
    }),
  ],
  providers: [AuthService, UsersRepository, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
