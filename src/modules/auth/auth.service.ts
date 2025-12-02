import {UsersRepository} from '../users/users.repository'
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto : LoginDto) {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token };


  }


}
