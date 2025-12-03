import { Injectable  , InternalServerErrorException} from '@nestjs/common';
import {ChallengesRepository} from './challenges.repository'
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ChallengesService {

  constructor(private readonly challengesRepository: ChallengesRepository) {}

    async create(dto :CreateChallengeDto ){
    try{
        const data = {
        ...dto,
        flagHash: dto.type === 'ctf' && dto.flagHash ? await bcrypt.hash(dto.flagHash, 10) : undefined,
      };

        return this.challengesRepository.createChallenge(data);


    } catch (error) {
      console.error('Error registering participant:', error);
      throw new InternalServerErrorException('Failed to register participant');
    }
    }

}
