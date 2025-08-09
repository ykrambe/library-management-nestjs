import { IsString, IsOptional, IsArray, IsInt, Min, IsUrl } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsUrl()
  @IsOptional()
  coverUrl?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;
}