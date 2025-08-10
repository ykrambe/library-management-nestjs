import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  /**
   * Borrow a book
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({ schema: { properties: { userId: { type: 'number' }, bookId: { type: 'number' } } } })
  // You may want to add ApiResponse decorators for success and error cases
  async borrowBook(@Body('userId') userId: number, @Body('bookId') bookId: number) {
    return await this.borrowService.borrowBook(userId, bookId);
  }

  /**
   * Return a borrowed book
   */
  @Post('return')
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiBody({ schema: { properties: { borrowId: { type: 'number' } } } })
  // You may want to add ApiResponse decorators for success and error cases
  async returnBook(@Body('borrowId') borrowId: number) {
    return await this.borrowService.returnBook(borrowId);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  @ApiOperation({ summary: 'Get borrow history' })
  @ApiBearerAuth('access-token')
  @ApiBody({ schema: { properties: { userId: { type: 'number' } } } })
  async getBorrowHistory(@Body('userId') userId: number) {
    return await this.borrowService.getBorrowHistory(userId);
  }

  @Get('borrowed')
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  @ApiOperation({ summary: 'Get borrowed books' })
  @ApiBearerAuth('access-token')
  @ApiBody({ schema: { properties: { userId: { type: 'number' } } } })
  async getBorrowedBooks(@Body('userId') userId: number) {
    return await this.borrowService.getBorrowedBooks(userId);
  }
}