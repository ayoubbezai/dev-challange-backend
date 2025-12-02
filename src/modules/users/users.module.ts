import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../../database/prisma.service';
import {UsersController} from './users.controller'
@Module({
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersService , UsersRepository],
  controllers : [UsersController]
})
export class UsersModule {}
