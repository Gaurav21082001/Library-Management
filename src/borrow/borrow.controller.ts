import { BorrowService } from './borrow.service';
import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Get()
  showBorrow() {
    return this.borrowService.showBorrow();
  }

  @Post(':bookId/issue/:userId')
  issueBook(@Param('bookId') bookId: number, @Param('userId') userId: number) {
    return this.borrowService.issueBook(bookId, userId);
  }

  @Post(':borrowId/return')
  returnBook(@Param('borrowId') borrowId: number) {
    return this.borrowService.returnBook(borrowId);
  }
}
