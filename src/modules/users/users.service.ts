import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateParticipantDto } from './dto/create-participant.dto';
import * as bcrypt from 'bcryptjs';

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
}
