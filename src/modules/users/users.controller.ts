import { Controller , Post , Body  ,Get} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('participants')
  async registerParticipant(@Body() dto: CreateParticipantDto) {
    return this.usersService.registerParticipant(dto);
  }
  @Get('leader-board')
  async leaderBoard(){
    const data = await this.usersService.leaderBoard();

        return {
      success : true,
      message: 'leader board got successful',
      data :  data
    }
  }
}
