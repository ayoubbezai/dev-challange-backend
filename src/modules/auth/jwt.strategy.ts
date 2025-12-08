import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.access_token || null; // read from cookie
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(), // fallback to Authorization header
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultsecret',
    });
  }

  async validate(payload: any) {
    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}
