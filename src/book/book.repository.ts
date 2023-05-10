import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BookEntity } from './Entity/book.entity';

@Injectable()
export class BookRepository extends Repository<BookEntity> {}
