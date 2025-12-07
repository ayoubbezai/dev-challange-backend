import { Controller , Post , Body  , Query , Get , UseGuards } from '@nestjs/common';
import {ChallengesService} from './challenges.service'
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { GetChallengesDto  } from "./dto/get-challenges.dto";
import { Roles } from '../auth/roles.decorator';

import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {  RolesGuard } from 'src/modules/auth/roles.guard';

@Controller('challenges')
export class ChallengesController {
      constructor(private readonly challengesService: ChallengesService) {}
    
      @Post()
      @UseGuards(JwtAuthGuard , RolesGuard)
      @Roles('admin')
      async addChallenge(@Body() dto: CreateChallengeDto) {
        return this.challengesService.create(dto);
      }
    
 @Get()
  @UseGuards(JwtAuthGuard) 
  getChallenges(@Query() query: GetChallengesDto) {
    return this.challengesService.getAll(query);
  }
}
