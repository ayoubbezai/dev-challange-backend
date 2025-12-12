import { Controller , Post , Body  , Query , Get , UseGuards } from '@nestjs/common';
import {ChallengesService} from './challenges.service'
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { GetChallengesDto  } from "./dto/get-challenges.dto";
import { Roles } from '../auth/roles.decorator';
import { User } from '../../common/decorators/user.decorator';

import { JwtCookieGuard } from 'src/modules/auth/jwt-cookie.guard';
import {  RolesGuard } from 'src/modules/auth/roles.guard';

import { Throttle } from '@nestjs/throttler';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UseGuards(JwtCookieGuard, RolesGuard)
  @Roles('admin')
@Throttle({ default: { limit: 5, ttl: 60 } })  
  async addChallenge(@Body() dto: CreateChallengeDto) {
    return this.challengesService.create(dto);
  }

  @Get()
  @UseGuards(JwtCookieGuard)
@Throttle({ default: { limit: 20, ttl: 60 } })  
  getChallenges(@Query() query: GetChallengesDto, @User() user) {
    return this.challengesService.getAll(query, user);
  }

}
