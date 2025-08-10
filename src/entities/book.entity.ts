import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class Book {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Clean Code' })
  @Column({ length: 200 })
  title: string;

  @ApiProperty({ example: ['Robert C. Martin'] })
  @Column('simple-array')
  authors: string[];

  @ApiProperty({ example: '9780132350884', required: false })
  @Column({ unique: true, nullable: true })
  isbn: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg', required: false })
  @Column({ nullable: true })
  coverUrl: string;

  @ApiProperty({ example: 10, default: 0 })
  @Column({ default: 0 })
  stock: number;

  @ApiProperty({ type: String, format: 'date-time' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @UpdateDateColumn()
  updated_at: Date;
}