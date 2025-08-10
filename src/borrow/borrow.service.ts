import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from '../entities/borrow.entity';
import { Repository, DataSource } from 'typeorm';
import { Book } from '../entities/book.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private readonly borrowRepository: Repository<Borrow>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async borrowBook(userId: number, bookId: number): Promise<Borrow> {
    return await this.dataSource.transaction(async manager => {
      const user = await manager.findOne(User, { where: { id: userId } });
      const book = await manager.findOne(Book, { where: { id: bookId } });
      if (!user || !book) {
        throw new NotFoundException('User or Book not found');
      }
      if (book.stock <= 0) {
        throw new NotFoundException('Book is not available');
      }
      if (user.role !== 'MEMBER') {
        throw new NotFoundException('Only members can borrow books');
      }
      book.stock -= 1;
      await manager.save(book);
      const borrow = manager.create(Borrow, {
        user,
        book,
        borrow_date: new Date(),
        status: 'BORROWED',
      });
      return await manager.save(borrow);
    });
  }

  async returnBook(borrowId: number, userId: number): Promise<Borrow> {
    return await this.dataSource.transaction(async manager => {
      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const borrow = await manager.findOne(Borrow, { where: { id: borrowId }, relations: ['book', 'user'] });
      if (!borrow) {
        throw new NotFoundException('Borrow record not found');
      }
      if (borrow.user.id !== user.id) {
        throw new NotFoundException('You are not the borrower');
      }
      if (borrow.status !== 'BORROWED') {
        throw new NotFoundException('Book is not currently borrowed');
      }
      borrow.return_date = new Date();
      borrow.status = 'RETURNED';
      borrow.book.stock += 1;
      await manager.save(borrow.book);
      return await manager.save(borrow);
    });
  }

  async getBorrowHistory(userId: number): Promise<Borrow[]> {
    return await this.borrowRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
    });
  }

  async getBorrowedBooks(userId: number): Promise<Borrow[]> {
    return await this.borrowRepository.find({
      where: { user: { id: userId }, status: 'BORROWED' },
      relations: ['book'],
    });
  }
}