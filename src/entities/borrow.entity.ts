import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('borrows')
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book)
  book: Book;

  @Column()
  borrow_date: Date;

  @Column({ nullable: true })
  return_date: Date;

  @Column({ default: 'BORROWED' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}