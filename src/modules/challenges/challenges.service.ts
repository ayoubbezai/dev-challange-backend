import { Injectable  , InternalServerErrorException} from '@nestjs/common';
import {ChallengesRepository} from './challenges.repository'
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import * as bcrypt from 'bcryptjs';
import { GetChallengesDto  } from "./dto/get-challenges.dto";
type Hint = { content: string; isOpen: boolean };

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
      console.error('Error create challnage:', error);
      throw new InternalServerErrorException('Failed to create challange');
    }
    }

    async getAll(query : GetChallengesDto){
    try{
        const data = await this.challengesRepository.getChallenges(query);

      const sanitizedChallenges = data.data.map(ch => ({
        ...ch,
        hints: Array.isArray(ch.hints)
            ? (ch.hints as Hint[]).filter(hint => hint.isOpen)
            : [],
        }));

        return {
          data : sanitizedChallenges ,
          meta : data.meta
        } 

    } catch (error) {
      console.error('Error create challnage:', error);
      throw new InternalServerErrorException('Failed to create challange');
    }
    }

}
