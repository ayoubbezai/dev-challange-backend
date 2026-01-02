import { Controller, Post, Body  , Res ,Get , Req ,UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response , Request } from 'express';
import { JwtCookieGuard } from 'src/modules/auth/jwt-cookie.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

   @Post('login')
@Throttle({ default: { limit: 1, ttl: 60 } })  
async login(
  @Body() dto: LoginDto,
  @Res({ passthrough: true }) res: Response,
) {
  const { userResponse, access_token } = await this.authService.login(dto);

res.cookie('access_token', access_token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',        // or 'strict'
  domain: '.gdgbatna.com',
  path: '/',
});
  return {
    success: true,
    message: 'Login successful',
    data: access_token,
  };
}


    @Get('me')
    @UseGuards(JwtCookieGuard)
    @Throttle({ default: { limit: 60, ttl: 60 } })  

    async me(@Req()  req:Request) {
    const userResponse =  await this.authService.me((req as any).user.sub)

      return {
      success : true,
      message: 'auth successful',
      data :  userResponse
    }
    }
    @Post('logout')
    @Throttle({ default: { limit: 5, ttl: 60 } })  
  logout(@Res({ passthrough: true }) res: Response) {
    // Clear the cookie
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true, // true in production
      sameSite: 'lax',
    });

    return {
      success: true,
      message: "Logged out successfully",
    }
    }
}
