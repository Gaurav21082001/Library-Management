import { BookService } from './book.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  DefaultValuePipe,ParseIntPipe
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateBookDto } from './dto/create_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';
import { BookEntity } from './Entity/book.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('books')
  getBooks(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<BookEntity>>  {
    limit = limit > 50 ? 50 : limit;
    return this.bookService.paginate({
      page,
      limit,
    });
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
