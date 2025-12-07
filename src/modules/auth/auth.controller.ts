import { Controller, Post, Body  , Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
  async login(@Body() dto: LoginDto ,  @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(dto);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: 'lax', // or 'none' if using cross-site cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return { message: 'Login successful' };
  }
}
