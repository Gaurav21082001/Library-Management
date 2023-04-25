import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookEnity } from './Entity/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';


@Module({
    imports:[TypeOrmModule.forFeature([BookEnity])],
    providers:[BookController,BookService],
})
export class BookModule {}
