import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('book_audit_logs')
export class BookAuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book)
  book: Book;

  @Column()
  action: string;

  @Column({ type: 'json', nullable: true })
  old_value: any;

  @Column({ type: 'json', nullable: true })
  new_value: any;

  @ManyToOne(() => User)
  performed_by: User;

  @CreateDateColumn()
  timestamp: Date;
}