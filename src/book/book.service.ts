import { CursorService } from './cursor.service';
import { UpdateBookDto } from './dto/update_book.dto';
import { CreateBookDto } from './dto/create_book.dto';
import { Injectable } from '@nestjs/common';
import { BookEntity } from './Entity/book.entity';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepository: BookRepository,
    private cursorService: CursorService,
  ) {}

  async findPaginated(
    limit: number,
    _column: string,
    direction: 'ASC' | 'DESC',
    cursor?: string,
  ) {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .take(limit + 1)
      .orderBy(`book.${_column}`, direction);

    if (cursor) {
      query
        .where('book.id >=:cursor', { cursor: cursor })
        .take(limit + 1)
        .orderBy(`book.${_column}`, direction);
    }
    const entities = await query.getMany();
    const hasNextPage = entities.length > limit;
    const items = hasNextPage ? entities.slice(0, -1) : entities;
    if (items.length == 0) {
      return 'books not found';
    }
    const endCursor =
      items.length > 0
        ? this.cursorService.encodeCursor(items[items.length - 1].id.toString())
        : null;

    return {
      items,
      totalCount: items.length,
      hasNextPage,
      endCursor,
    };
  }

  async addBook(input: CreateBookDto): Promise<BookEntity> {
    return await this.bookRepository.save({ ...input });
  }

  async updateBookDetails(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookEntity | string> {
    const book = await this.bookRepository.findOneBy({ id: id });
    if (book) {
      book.title = updateBookDto.title;
      book.details = updateBookDto.details;
      book.author = updateBookDto.author;
      book.stock = updateBookDto.stock;
      return await this.bookRepository.save(book);
    } else {
      return 'Book not found';
    }
  }

  async deleteBook(id: number) {
    return await this.bookRepository.delete(id);
  }

  async searchBook(search: string): Promise<BookEntity[] | string> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    const books = await queryBuilder
      .where('book.title LIKE :search OR book.author LIKE :search', {
        search: `%${search}%`,
      })
      .getMany();
    if (books.length==0) {
      return 'No result found';
    }
    return books;
  }
}
