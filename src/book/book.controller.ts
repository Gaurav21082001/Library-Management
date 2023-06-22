import { CursorService } from './cursor.service';
import { BookService } from './book.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Body, Req, UseGuards } from '@nestjs/common/decorators';
import { CreateBookDto } from './dto/create_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';
import { BookEntity } from './Entity/book.entity';
import { GetBooksQueryInput } from './get_books_query.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('book')
export class BookController {
  constructor(
    private bookService: BookService,
    private cursorService: CursorService,
  ) {}

  @Get('books')
  async getBooks(@Query() queryParams: GetBooksQueryInput) {
    const limit = parseInt(queryParams.limit);
    // return queryParams.column;
    const decodedStartCursor = queryParams.startCursor
      ? this.cursorService.decodeCursor(queryParams.startCursor)
      : undefined;
    const decodedEndCursor = queryParams.endCursor
      ? this.cursorService.decodeCursor(queryParams.endCursor)
      : undefined;
    return await this.bookService.findPaginated(
      queryParams,
      limit,
      decodedStartCursor,
      decodedEndCursor,
    );
  }

  @Post('add')
  @UseGuards(AuthGuard)
  async addBook(@Body() body: BookEntity, @Req() request) {
    const role = request.user.role;
    return await this.bookService.addBook(body,role);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateBookDetails(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
    @Req() request,
  ) {
    const role = request.user.role;
    return await this.bookService.updateBookDetails(id, updateBookDto,role);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteBook(@Param('id') id: number, @Req() request) {
    const role = request.user.role;
    return await this.bookService.deleteBook(id,role);
  }

  @Get(':search')
  async searchBook(@Param('search') search: string) {
    return await this.bookService.searchBook(search);
  }
}
