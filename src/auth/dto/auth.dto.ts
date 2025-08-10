import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, IsNotEmpty, Max, IsEmail } from 'class-validator';

export class loginDTO {
  @ApiProperty({ example: 'user@mail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password12@' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
