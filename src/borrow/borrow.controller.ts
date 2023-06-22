import { AuthGuard } from 'src/auth/auth.guard';
import { BorrowService } from './borrow.service';
import { Controller, Get, Param, Post,Req,UseGuards } from '@nestjs/common';

@Controller('borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Get()
  showBorrow() {
    return this.borrowService.showBorrow();
  }

  @Post(':bookId/issue')
  @UseGuards(AuthGuard)
  issueBook(@Param('bookId') bookId: number,@Req() request) {
    const userId=request.user.userId;
    return this.borrowService.issueBook(bookId, userId);
  }

  // @Post(':borrowId/return')
  // returnBook(@Param('borrowId') borrowId: number) {
  //   return this.borrowService.returnBook(borrowId);
  // }

  @Post(':bookId/return')
  @UseGuards(AuthGuard)
  returnBook(@Param('bookId') bookId: number,@Req() request) {
    const userId=request.user.userId;
    return this.borrowService.returnBook(bookId,userId);
  }
}
