import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book/Entity/book.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/Entity/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
     
      username: 'root',
      password: 'root',
      database: 'bookdb',
      entities: [BookEntity,UserEntity],
      synchronize: true,
    }),
    BookModule,
    UserModule],
  controllers: [AppController, BookController, UserController],
  providers: [AppService, BookService, UserService],
})
export class AppModule {}
