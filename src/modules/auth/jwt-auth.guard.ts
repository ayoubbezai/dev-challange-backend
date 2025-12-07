// src/modules/auth/jwt-auth.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies?.access_token?.access_token;
    if (!token) throw new UnauthorizedException('No token found');

    console.log(token)
    req.headers.authorization = `Bearer ${token}`;
    return req;
  }
}
