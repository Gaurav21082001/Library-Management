import { BookService } from './book.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateBookDto } from './dto/create_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';
import { BookEntity } from './Entity/book.entity';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('books')
  async getBooks(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('cursor') cursor: string,
  ) {
    return await this.bookService.paginate(limit, cursor);
  }

  @Post('add')
  async addBook(@Body() body: BookEntity) {
    return await this.bookService.addBook(body);
  }
  @Put(':id')
  async updateBookDetails(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.updateBookDetails(id, updateBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return await this.bookService.deleteBook(id);
  }

  @Get(':search')
  async searchBook(@Param('search') search: string) {
    return await this.bookService.searchBook(search);
  }
}
