import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SubmitionsService } from './submitions.service';
import { AddSubmissionDto } from './dto/add-submition.dto';
import { JwtCookieGuard } from '../auth/jwt-cookie.guard';
import { User } from '../../common/decorators/user.decorator';

@Controller('submissions')
export class SubmitionsController {
  constructor(private readonly submitionsService: SubmitionsService) {}

  @UseGuards(JwtCookieGuard)
  @Post()
  async addSubmission(@Body() dto: AddSubmissionDto, @User() user) {
    return this.submitionsService.addSubmission(dto, user.sub);
  }
}
