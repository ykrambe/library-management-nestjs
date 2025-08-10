import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, IsNotEmpty, Max, IsEmail } from 'class-validator';

export class loginDTO {
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
