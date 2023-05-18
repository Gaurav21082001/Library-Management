import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookEntity } from './Entity/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService, BookRepository],
})
export class BookModule {}
