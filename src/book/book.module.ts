import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookEntity } from './Entity/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { CursorService } from './cursor.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { AuthorizedUserModule } from 'src/authorized_user/authorized_user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]),AuthorizedUserModule],
  controllers: [BookController],
  providers: [BookService, BookRepository,CursorService],
  exports: [BookService, BookRepository],
})
export class BookModule {}
