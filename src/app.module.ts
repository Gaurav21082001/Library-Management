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
import { BorrowModule } from './borrow/borrow.module';
import { BorrowEntity } from './borrow/Entity/borrow.entity';
import { BookRepository } from './book/book.repository';
import { AuthModule } from './auth/auth.module';
import { AuthorizedUserController } from './authorized_user/authorized_user.controller';
import { AuthorizedUserService } from './authorized_user/authorized_user.service';
import { AuthorizedUserModule } from './authorized_user/authorized_user.module';
import { Authorized_usersEntity } from './authorized_user/entity/authorized_user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'bookdb',
      entities: [BookEntity, UserEntity, BorrowEntity, Authorized_usersEntity],
      synchronize: true,
    }),
    BookModule,
    UserModule,
    BorrowModule,
    AuthModule,
    AuthorizedUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
