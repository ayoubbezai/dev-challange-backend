import { Controller, Post, Body  , Res ,Get , Req ,UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response , Request } from 'express';
import { JwtCookieGuard } from 'src/modules/auth/jwt-cookie.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
  async login(@Body() dto: LoginDto ,  @Res({ passthrough: true }) res: Response) {
    const {userResponse , access_token : token} = await this.authService.login(dto);

    // res.cookie('access_token', token, {
    //   httpOnly: true,
    //   secure: true, // true in production with HTTPS
    //   sameSite: 'none', // or 'none' if using cross-site cookies
    //   path: "/", 
    //     maxAge: 1000 * 60 * 60 * 24, // 1 day
    // });
    return {
      success : true,
      message: 'Login successful',
      data :  userResponse,
      token : token
    }
  

  }

    @Get('me')
    @UseGuards(JwtCookieGuard)
    async me(@Req()  req:Request) {
    const userResponse =  await this.authService.me((req as any).user.sub)

      return {
      success : true,
      message: 'auth successful',
      data :  userResponse
    }
    }
    @Post('logout')
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
