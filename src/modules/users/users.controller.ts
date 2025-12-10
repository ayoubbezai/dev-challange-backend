import { Controller , Post , Body  ,Get , UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { JwtCookieGuard } from 'src/modules/auth/jwt-cookie.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('participants')
  async registerParticipant(@Body() dto: CreateParticipantDto) {
    return this.usersService.registerParticipant(dto);
  }
  @Get('leader-board')
  @UseGuards(JwtCookieGuard) 
  async leaderBoard(){
    const data = await this.usersService.leaderBoard();

        return {
      success : true,
      message: 'leader board got successful',
      data :  data
    }
  }
}
