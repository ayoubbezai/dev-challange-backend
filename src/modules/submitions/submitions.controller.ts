import { Controller, Post, Body, UseGuards  ,Get } from '@nestjs/common';
import { SubmitionsService } from './submitions.service';
import { AddSubmissionDto } from './dto/add-submition.dto';
import { JwtCookieGuard } from '../auth/jwt-cookie.guard';
import { User } from '../../common/decorators/user.decorator';


import { Roles } from '../auth/roles.decorator';

import {  RolesGuard } from 'src/modules/auth/roles.guard';
@Controller('submissions')
export class SubmitionsController {
  constructor(private readonly submitionsService: SubmitionsService) {}

  @UseGuards(JwtCookieGuard)
  @Post()
  @Throttle({ default: { limit: 1, ttl: 60 } }) 
  async addSubmission(@Body() dto: AddSubmissionDto, @User() user) {
    return this.submitionsService.addSubmission(dto, user.sub);
  }

  @UseGuards(JwtCookieGuard , RolesGuard)
  @Roles('admin')
  @Get()
  @Throttle({ default: { limit: 100, ttl: 60 } })  
  async getSubmission() {
    return this.submitionsService.getSubmitions();
    
  }
}
