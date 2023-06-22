import { CursorService } from './cursor.service';
import { UpdateBookDto } from './dto/update_book.dto';
import { CreateBookDto } from './dto/create_book.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    queryParams,
    limit,
    startCursor?: string,
    endCursor?: string,
  ) {
    // return typeof(limit);
    const query = this.bookRepository
      .createQueryBuilder('book')
      .orderBy(`book.${queryParams.column}`, queryParams.direction);
    // return `startCursor is ${startCursor} && endCursor is ${endCursor} and ${queryParams.column}`;
    if (startCursor && endCursor) {
      // return startCursor;
      query
        .where('book.id >= :startCursor AND book.id <= :endCursor', {
          startCursor: startCursor,
          endCursor: endCursor,
        })
        .orderBy(`book.${queryParams.column}`, queryParams.direction);
      const entities = await query.getMany();
      // return entities[0]
      const items = entities;
      if (items.length == 0) {
        throw new HttpException(
          'Book not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const limitCursor =
        items.length > 0
          ? this.cursorService.encodeCursor(
              items[items.length - 1].id.toString(),
            )
          : null;

      return {
        items,
        totalCount: items.length,
        limitCursor,
      };
    }
    if (limit && startCursor) {
      query
        .where('book.id >=:startCursor', { startCursor: startCursor })
        .take(limit + 1)
        .orderBy(`book.${queryParams.column}`, queryParams.direction);
      const entities = await query.getMany();
      // return entities;
      const hasNextPage = entities.length > queryParams.limit;
      const items = hasNextPage ? entities.slice(0, -1) : entities;
      if (items.length == 0) {
        throw new HttpException(
          'Book not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const endCursor =
        items.length > 0
          ? this.cursorService.encodeCursor(
              items[items.length - 1].id.toString(),
            )
          : null;

      return {
        items,
        totalCount: items.length,
        hasNextPage,
        endCursor,
      };
    }
    const entities = await query.getMany();
    const hasNextPage = entities.length > queryParams.limit;
    const items = hasNextPage ? entities.slice(0, -1) : entities;
    if (items.length == 0) {
      throw new HttpException(
        'Book not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const limitCursor =
      items.length > 0
        ? this.cursorService.encodeCursor(items[items.length - 1].id.toString())
        : null;

    return {
      items,
      totalCount: items.length,
      hasNextPage,
      limitCursor,
    };
  }

  
  async addBook(input: CreateBookDto,role): Promise<BookEntity> {
    if(role==='librarian'){
     const response= await this.bookRepository.save({ ...input });
       throw new HttpException(`${response}`,HttpStatus.OK)
    }
    throw new HttpException('User does not exist',HttpStatus.BAD_REQUEST)
  }

  async updateBookDetails(
    id: number,
    updateBookDto: UpdateBookDto,
    role
  ): Promise<BookEntity> {
    if(role==='librarian'){
      const book = await this.bookRepository.findOneBy({ id: id });
    if (book) {
      book.title = updateBookDto.title;
      book.details = updateBookDto.details;
      book.author = updateBookDto.author;
      book.stock = updateBookDto.stock;
      const response= await this.bookRepository.save(book);
      throw new HttpException(`${response.id} book Updated successfully`,HttpStatus.OK)
    } else {
      throw new HttpException(
        'Book not found',
        HttpStatus.NOT_FOUND,
      );
    }
    }
    throw new HttpException('User does not exist',HttpStatus.BAD_REQUEST)
    
  }

  async deleteBook(id: number,role){
    if(role==='librarian'){
      const book=await this.bookRepository.findOneBy({id:id});
      if(book){
         await this.bookRepository.delete(id);
         throw new HttpException(
          'Book successfully deleted',
          HttpStatus.OK,
        );
      }else{
        throw new HttpException(
          'Book not found',
          HttpStatus.NOT_FOUND,
        );
      }
      
    }
    throw new HttpException('User does not exist',HttpStatus.BAD_REQUEST)
    
  }

  async searchBook(search: string): Promise<BookEntity[] > {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    const books = await queryBuilder
      .where('book.title LIKE :search OR book.author LIKE :search', {
        search: `%${search}%`,
      })
      .getMany();
    if (books.length == 0) {
      throw new HttpException(
        'Book not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return books;
  }
}
