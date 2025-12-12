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
      const data =  await this.usersRepository.leaderBoard()
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
