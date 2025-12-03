import { Controller , Post , Body } from '@nestjs/common';
import {ChallengesService} from './challenges.service'
import { CreateChallengeDto } from "./dto/create-challenge.dto";

@Controller('challenges')
export class ChallengesController {
      constructor(private readonly challengesService: ChallengesService) {}
    
      @Post()
      async addChallenge(@Body() dto: CreateChallengeDto) {
        return this.challengesService.create(dto);
      }
    
}
