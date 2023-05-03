import { BorrowService } from './borrow.service';
import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('borrow')
export class BorrowController {

    constructor(private borrowService:BorrowService){}

    @Get()
    showBorrow(){
        return this.borrowService.showBorrow()
    }

    @Post(':id/issue/:userId')
    issueBook(@Param('id') id:number,@Param('userId') userId:number){
        return this.borrowService.issueBook(id,userId);
    }

    @Post(':id/return')
    returnBook(@Param('id') id:number){
        return this.borrowService.returnBook(id);
    }

}
