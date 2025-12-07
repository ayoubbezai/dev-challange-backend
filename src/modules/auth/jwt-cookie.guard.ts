import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtCookieGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.access_token;

    if (!token) throw new UnauthorizedException('No token found');

    try {
      const decoded = this.jwtService.verify(token); // decode JWT
      req.user = decoded; // attach to request
      return req;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
