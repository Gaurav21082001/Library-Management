import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book/Entity/book.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
     
      username: 'root',
      password: 'root',
      database: 'bookdb',
      entities: [BookEntity],
      synchronize: true,
    }),
    BookModule],
  controllers: [AppController, BookController],
  providers: [AppService, BookService],
})
export class AppModule {}
