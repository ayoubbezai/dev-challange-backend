import { Injectable, ConflictException, InternalServerErrorException , NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateParticipantDto } from './dto/create-participant.dto';
import * as bcrypt from 'bcryptjs';
import {EditParticipantDto} from './dto/edit-participant.dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerParticipant(dto: CreateParticipantDto) {
    
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      return await this.usersRepository.createParticipant({
        ...dto,
        password: hashedPassword,
      });
    } catch (error) {
      console.error('Error registering participant:', error);
      throw new InternalServerErrorException('Failed to register participant');
    }
  }

  async leaderBoard (){
    try{
      // const data =  await this.usersRepository.leaderBoard()
      const data = [
        {
            "id": "6939d67e9ebab92bbc003299",
            "points": 1490,
            "nick_name": "mihiderar"
        },
        {
            "id": "693af86ac883f7a95d725c8a",
            "points": 1235,
            "nick_name": "y4ss3r"
        },
        {
            "id": "6939d6519ebab92bbc003296",
            "points": 1130,
            "nick_name": "khaliil"
        },
        {
            "id": "6941a605583d099cdfde943f",
            "points": 1020,
            "nick_name": "nourcr0cs"
        },
        {
            "id": "6939dabc9ebab92bbc0032a2",
            "points": 620,
            "nick_name": "AYA"
        },
        {
            "id": "6939c7779ebab92bbc003291",
            "points": 300,
            "nick_name": "tboun"
        },
        {
            "id": "6941a182583d099cdfde943c",
            "points": 250,
            "nick_name": "og"
        },
        {
            "id": "6939d6779ebab92bbc003297",
            "points": 250,
            "nick_name": "ayb"
        },
        {
            "id": "6939beffe56cb1e4a8b98ab3",
            "points": 50,
            "nick_name": "test"
        },
        {
            "id": "693c887ad6b8fe7fd5ef5404",
            "points": 50,
            "nick_name": "chaker_027"
        },
        {
            "id": "693c373c4ba4ca737425ec7e",
            "points": 50,
            "nick_name": "coldcoder"
        },
        {
            "id": "693bcc07bffef475d09e1594",
            "points": 50,
            "nick_name": "Abdelkader"
        },
        {
            "id": "693b32c5433934f56a911314",
            "points": 50,
            "nick_name": "jimmy"
        },
        {
            "id": "6939d42f9ebab92bbc003293",
            "points": 50,
            "nick_name": "hacker123"
        },
        {
            "id": "6939da559ebab92bbc0032a1",
            "points": 50,
            "nick_name": "ilyes_999"
        },
        {
            "id": "694a71e97d7f9c386fc84872",
            "points": 50,
            "nick_name": "imu"
        },
        {
            "id": "6939d95b9ebab92bbc00329f",
            "points": 50,
            "nick_name": "mk_aca"
        },
        {
            "id": "6939d67c9ebab92bbc003298",
            "points": 50,
            "nick_name": "rofaida_21"
        },
        {
            "id": "694887ff59d5abefb317c11e",
            "points": 0,
            "nick_name": "Z3roR"
        },
        {
            "id": "69426a0f35d90a59c4abdfd4",
            "points": 0,
            "nick_name": "test5"
        },
        {
            "id": "6942667c35d90a59c4abdfd3",
            "points": 0,
            "nick_name": "test3"
        },
        {
            "id": "694c60207d7f9c386fc8487a",
            "points": 0,
            "nick_name": "jihane_bnt"
        },
        {
            "id": "693c8fed6b4a55c4906c8680",
            "points": 0,
            "nick_name": "Achraf"
        },
        {
            "id": "693c8e7d6b4a55c4906c867f",
            "points": 0,
            "nick_name": "lina44"
        },
        {
            "id": "693c8e2f6b4a55c4906c867e",
            "points": 0,
            "nick_name": "Taha19"
        },
        {
            "id": "693bfa307aacb4e753a3e29b",
            "points": 0,
            "nick_name": "djamel_eddine"
        },
        {
            "id": "693bf9aa7aacb4e753a3e296",
            "points": 0,
            "nick_name": "Djamel_eddine"
        },
        {
            "id": "693b4e6023307c9c7db95c3f",
            "points": 0,
            "nick_name": "samy"
        },
        {
            "id": "6939dadb9ebab92bbc0032a3",
            "points": 0,
            "nick_name": "idj.a"
        },
        {
            "id": "6939da039ebab92bbc0032a0",
            "points": 0,
            "nick_name": "Rabah"
        },
        {
            "id": "6939d6ce9ebab92bbc00329a",
            "points": 0,
            "nick_name": "m0hseghir5"
        }
    ]

      return data

    }catch  (error){
            console.error('Error getting  participant:', error);
      throw new InternalServerErrorException('Failed to getting participant');
    }
  }

    async participants (){
    try{
      const data =  await this.usersRepository.participants()
      return data

    }catch  (error){
            console.error('Error getting  participant:', error);
      throw new InternalServerErrorException('Failed to getting participant');
    }
  }

  async editUser(dto: EditParticipantDto) {
      const updated = await this.usersRepository.editUser(dto);
  
      if (!updated) {
        throw new NotFoundException({
          success: false,
          message: 'participant not found',
          status: 'error',
        });
      }
  
      return {
        success: true,
        message: 'participant updated successfully',
      };
    }
  
}
