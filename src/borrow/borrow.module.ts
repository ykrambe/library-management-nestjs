import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { Book } from 'src/entities/book.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from 'src/entities/borrow.entity';

@Module({
  controllers: [BorrowController],
  providers: [BorrowService],
  imports: [TypeOrmModule.forFeature([Book, User, Borrow])],
})
export class BorrowModule {}