import { BookService } from './book.service';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateBookDto } from './DTO/createBook.dto';
@Controller('book')
export class BookController {

    constructor(private bookService:BookService){}
    @Get('getbooks')
    getBooks(){
        return this.bookService.getBooks();
    }

    @Post('addbook')
   async addBook(@Body() body:CreateBookDto){
        return await this.bookService.addBook(body);
    }


}
