import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { loginDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  // Implement login, register, and JWT validation logic here
  async login(loginDto: loginDTO) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new NotFoundException('User not found');
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    const payload = { email: user.email, role: user.role, id: user.id, first_name: user.firstName, last_name: user.lastName };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        role: user.role,
      }
    };
  }
}