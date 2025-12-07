import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtCookieGuard } from './modules/auth/jwt-cookie.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtCookieGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
