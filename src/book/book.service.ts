import { UpdateBookDto } from './dto/update_book.dto';
import { CreateBookDto } from './dto/create_book.dto';
import { Injectable } from '@nestjs/common';
import { BookEntity } from './Entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRepository } from './book.repository';
import { IPaginationOptions,Pagination,paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepository: BookRepository,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<BookEntity>> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    queryBuilder.orderBy('book.id', 'ASC'); // Or whatever you need to do

    return paginate<BookEntity>(queryBuilder, options);
  }

  async getBooks():Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

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
