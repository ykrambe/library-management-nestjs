import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.preload({ id, ...updateBookDto });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    await this.bookRepository.remove(book);
  }
}
