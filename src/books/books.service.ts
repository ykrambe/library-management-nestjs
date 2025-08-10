import { BadRequestException, Injectable, NotFoundException, Inject } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @Inject('REDIS_CLIENT') private readonly redis: any
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findOneBy({ isbn: createBookDto.isbn });
    if (existingBook) {
      throw new BadRequestException('ISBN already exists');
    }
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

  async findQuery(query: { title?: string, author?: string, isbn?: string }): Promise<Book[]> {
    const { title, author, isbn } = query;
    if (!title && !author && !isbn) {
      throw new BadRequestException('At least one query parameter is required');
    }
    return this.bookRepository.find({
      where: {
        title: ILike(`%${title}%`),// tambahkan regex untuk pencarian tidak case sensitive
        authors: ILike(`%${author}%`),
        isbn: ILike(`%${isbn}%`),
      }
    });
  }

  async newBook(query: {word: string}): Promise<any> {
    const cacheKey = `google_books_${query.word}`;
    // Cek cache Redis
    const cachedBooks = await this.redis.get(cacheKey);
    if (cachedBooks) {
      console.log("🚀 ~ BooksService ~ newBook ~ cachedBooks:", cachedBooks)
      // Jika ada, parse dan return
      return JSON.parse(cachedBooks);
    }
    console.log("no cache found");

    
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query.word)}`
      );
      const books = response.data.items?.map((item: any) => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        isbn: item.volumeInfo.industryIdentifiers?.find((id: any) => id.type === 'ISBN_13')?.identifier || '',
        coverUrl: item.volumeInfo.imageLinks?.thumbnail || '',
      })) || [];
      // Simpan ke Redis
      await this.redis.set(cacheKey, JSON.stringify(books), 'EX', 3600);
      return books;
    } catch (error) {
      console.error('Error fetching from Google Books API:', error);
      throw new BadRequestException('Failed to fetch from Google Books API');
    }
  }

}
