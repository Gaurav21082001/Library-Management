import { UpdateBookDto } from './dto/update_book.dto';
import { CreateBookDto } from './dto/create_book.dto';
import { Injectable } from '@nestjs/common';
import { BookEntity } from './Entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepository: BookRepository,
  ) {}

  async getBooks():Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  // async addBook(createBookDto: CreateBookDto) {
  //     const book = new BookEntity();
  //     book.title = createBookDto.title;
  //     book.details = createBookDto.details;
  //     book.author = createBookDto.author;
  //     book.stock = createBookDto.stock;
  //     await book.save();
  //     return book;
  // }
  async addBook(input: CreateBookDto):Promise<BookEntity> {
    return await this.bookRepository.save({ ...input });
  }

  async updateBookDetails(id: number, updateBookDto: UpdateBookDto):Promise<BookEntity | string> {
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

  async deleteBook(id: number){
    return await this.bookRepository.delete(id);
  }

  async searchBook(search: string):Promise<BookEntity[]> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    const books = await queryBuilder
      .where('book.title LIKE :search OR book.author LIKE :search', {
        search: `%${search}%`,
      })
      .getMany();
    return books;
  }
}
