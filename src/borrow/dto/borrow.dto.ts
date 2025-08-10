import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class BorrowDto {
  @ApiProperty({ description: 'Book ID' })
  @IsNumber()
  bookId: number;
}

export class ReturnDto {
  @ApiProperty({ description: 'Borrow ID' })
  @IsNumber()
  borrowId: number;
}

