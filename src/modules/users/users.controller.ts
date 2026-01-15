import { Controller , Post , Body  ,Get , UseGuards , Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { JwtCookieGuard } from 'src/modules/auth/jwt-cookie.guard';
import { Throttle } from '@nestjs/throttler';
import { Roles } from '../auth/roles.decorator';
import {  RolesGuard } from 'src/modules/auth/roles.guard';
import {EditParticipantDto} from './dto/edit-participant.dto'


@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('participants')
  @Throttle({ default: { limit: 1, ttl: 60 } })  
  async registerParticipant(@Body() dto: CreateParticipantDto) {
    return this.usersService.registerParticipant(dto);
  }

  @Get('leader-board')
  @UseGuards(JwtCookieGuard) 
  @Throttle({ default: { limit: 20, ttl: 60 } })  
  async leaderBoard(){
    const data = await this.usersService.leaderBoard();

        return {
      success : true,
      message: 'leader board got successful',
      data :  data
    }
  }

  @UseGuards(JwtCookieGuard , RolesGuard)
  @Roles('admin')
  @Get('participants')
  @Throttle({ default: { limit: 20, ttl: 60 } })  
  async participants(){
    const data = await this.usersService.participants();

    return {
      success : true,
      message: 'participants board got successful',
      data :  data
    }
  }

  @UseGuards(JwtCookieGuard, RolesGuard)
  @Roles('admin')
  @Put('participants')
  @Throttle({ default: { limit: 100, ttl: 60 } })
  async editParticipant(@Body() dto: EditParticipantDto) {
    return this.usersService.editUser(dto);
  }
}
