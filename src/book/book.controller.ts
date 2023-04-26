import { BookService } from './book.service';
import { Controller, Delete, Get, Param, Post, Put,Query } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateBookDto } from './DTO/createBook.dto';
import { UpdateBookDto } from './DTO/updateBook.dto';
import { BookEnity } from './Entity/book.entity';
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
    @Put(':id')
    async updateBookDetails(@Param('id') id: number, @Body() updateBookDto:UpdateBookDto){
        return await this.bookService.updateBookDetails(id,updateBookDto);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: number){
        return await this.bookService.deleteBook(id);
    }


}
