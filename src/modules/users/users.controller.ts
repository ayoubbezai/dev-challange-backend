import { Controller , Post , Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Controller('participants')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async registerParticipant(@Body() dto: CreateParticipantDto) {
    return this.usersService.registerParticipant(dto);
  }
}
