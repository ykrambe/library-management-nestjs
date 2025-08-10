import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BorrowDto } from './dto/borrow.dto';

@ApiTags('Borrow')
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  /**
   * Borrow a book
   */
  @Post()
  @ApiOperation({ summary: 'Borrow a book (NEED AUTH / ONLY MEMBER)' })
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({ schema: { properties: { bookId: { type: 'number' } } } })
  // You may want to add ApiResponse decorators for success and error cases
  async borrowBook(@Body() borrowDto: BorrowDto, @Request() req) {
    // Get user id from jwt token
    const userId = req.user.userId;
    return await this.borrowService.borrowBook(userId, borrowDto.bookId);
  }

  /**
   * Return a borrowed book
   */
  @Post('return')
  @ApiOperation({ summary: 'Return a borrowed book (NEED AUTH / ONLY MEMBER)' })
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiBody({ schema: { properties: { borrowId: { type: 'number' } } } })
  // You may want to add ApiResponse decorators for success and error cases
  async returnBook(@Body('borrowId') borrowId: number, @Request() req) {
    const userId = req.user.userId;
    return await this.borrowService.returnBook(borrowId, userId);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  @ApiOperation({ summary: 'Get borrow history' })
  @ApiBearerAuth('access-token')
  async getBorrowHistory(@Request() req) {
    const userId = req.user.userId;
    return await this.borrowService.getBorrowHistory(userId);
  }

  @Get('borrowed')
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  @ApiOperation({ summary: 'Get borrowed books' })
  @ApiBearerAuth('access-token')
  async getBorrowedBooks(@Request() req) {
    const userId = req.user.userId;
    return await this.borrowService.getBorrowedBooks(userId);
  }
}