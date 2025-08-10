import { IsString, IsNotEmpty, IsEmail, Min, Max, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../auth/enums/role.enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nama depan user', example: 'Budi' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Nama belakang user', example: 'Santoso' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email user', example: 'budi@example.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password user', example: 'passwordku' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ description: 'Role user', example: 'USER', enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}