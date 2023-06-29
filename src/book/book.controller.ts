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
import { UpdateBookDto } from './dto/update_book.dto';
import { BookEntity } from './Entity/book.entity';
import { GetBooksQueryInput } from './get_books_query.dto';
import { CRUDRolesGuard } from 'src/roles/crudroles.guard';


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
  @UseGuards(CRUDRolesGuard)
  async addBook(@Body() body: BookEntity) {
    return await this.bookService.addBook(body);
  }

  @Put(':id')
  @UseGuards(CRUDRolesGuard)
  async updateBookDetails(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.updateBookDetails(id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(CRUDRolesGuard)
  async deleteBook(@Param('id') id: number) {
    return await this.bookService.deleteBook(id);
  }

  @Get(':search')
  async searchBook(@Param('search') search: string) {
    return await this.bookService.searchBook(search);
  }
}
