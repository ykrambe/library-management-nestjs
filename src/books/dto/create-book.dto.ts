import { IsString, IsOptional, IsArray, IsInt, Min, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Judul buku', example: 'Nama Buku' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Daftar penulis buku', example: ['Penulis 1', 'Penulis 2'] })
  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @ApiProperty({ description: 'Nomor ISBN buku', example: '978-3-16-148410-0' })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiProperty({ description: 'URL sampul buku', example: 'https://example.com/cover.jpg' })
  @IsUrl()
  @IsOptional()
  coverUrl?: string;

  @ApiProperty({ description: 'Stok buku', example: 10 })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;
}