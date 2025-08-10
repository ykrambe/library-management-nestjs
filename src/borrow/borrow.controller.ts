import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  async borrowBook(@Body('userId') userId: number, @Body('bookId') bookId: number) {
    return await this.borrowService.borrowBook(userId, bookId);
  }

  @Post('return')
  @UseGuards(JwtAuthGuard)
  @Roles('MEMBER')
  async returnBook(@Body('borrowId') borrowId: number) {
    return await this.borrowService.returnBook(borrowId);
  }
}