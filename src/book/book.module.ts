import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookEntity } from './Entity/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';



@Module({
    imports:[TypeOrmModule.forFeature([BookEntity,])],
    providers:[BookController,BookService],
})
export class BookModule {}
