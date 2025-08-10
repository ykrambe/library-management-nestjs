import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login endpoint
   */
  @Post()
  @ApiOperation({ summary: 'Login user (PUBLIC)' })
  @ApiBody({ type: loginDTO })
  // You may want to add ApiResponse decorators for success and error cases
  async login(@Body() loginDto: loginDTO) {
    return this.authService.login(loginDto);
  }

}
