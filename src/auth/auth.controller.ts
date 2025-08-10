import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // Implement login and register endpoints here
  @Post()
    async login(@Body() loginDto: loginDTO) {
    return this.authService.login(loginDto);
  }

}
