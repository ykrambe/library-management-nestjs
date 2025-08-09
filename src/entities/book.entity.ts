import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column('simple-array')
  authors: string[];

  @Column({ unique: true, nullable: true })
  isbn: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ default: 0 })
  stock: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}