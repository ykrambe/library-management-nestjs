import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '../entities/book.entity';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBearerAuth, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new book (ADMIN only)' })
  @ApiCreatedResponse({ type: Book, description: 'Book successfully created.' })
  @ApiBearerAuth('access-token')
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books (NEED AUTH)' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: [Book], description: 'List of all books.' })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get('detail/:id')
  @ApiOperation({ summary: 'Get book detail (NEED AUTH)' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: Book, description: 'Book detail.' })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book detail (ADMIN only)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles('ADMIN')
  @ApiOkResponse({ type: Book, description: 'Book successfully updated.' })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book (ADMIN only)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles('ADMIN')
  @ApiOkResponse({ description: 'Book successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Find book (MEMBER ONLY)' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'author', required: false, type: String })
  @ApiQuery({ name: 'isbn', required: false, type: String })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: [Book], description: 'List of books.' })
  findBookByQuery(@Query('title') title: string, @Query('author') author: string, @Query('isbn') isbn: string): any {
    const query = {
      title: title || '',
      author: author || '',
      isbn: isbn || '',
    }
    return this.booksService.findQuery(query);
  }

  @Get('new-book')
  @ApiOperation({ summary: 'Get new book to add in library (ADMIN only)' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Roles('ADMIN')
  @ApiOkResponse({ type: [Book], description: 'List of new books.' })
  findNewBook(@Query('word') word: string): Promise<any> {
    if (!word) {
      throw new BadRequestException('Word is required');
    }

    const query = {
      word: word,
    }
    return this.booksService.newBook(query);
  }
}
