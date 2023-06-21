import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/book/Entity/book.entity';
import { BorrowEntity } from './Entity/borrow.entity';
import { UserEntity } from 'src/user/Entity/user.entity';
import { DataSource, IsNull } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { BorrowRepository } from './borrow.repository';
import { getManager } from 'typeorm';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowEntity) private borrowRepository: BorrowRepository,
    private dataSource: DataSource,
  ) {}

  async showBorrow(): Promise<BorrowEntity[]> {
    return await this.borrowRepository.find();
  }

  async issueBook(
    bookId: number,
    userId: number,
  ): Promise<string | BorrowEntity | BorrowEntity[]> {
    const book = await BookEntity.findOneBy({ id: bookId });
    const user = await UserEntity.findOneBy({ id: userId });
    const borrow = new BorrowEntity();

    const borrowExist = await BorrowEntity.find({
      where: {
        bookId: bookId,
        userId: userId,
        returnDate: IsNull(),
      },
    });

    if (borrowExist.length >= 1) {
      return 'Duplicate book request';
    } else {
      if (!book) {
        return 'Book not exist';
      }
      if (!user) {
        return 'User not found';
      }
      if (book.stock != 0) {
        book.stock -= 1;
        borrow.bookId = bookId;
        borrow.userId = userId;
        borrow.issueDate = new Date();
        await this.dataSource.manager.transaction(
          async (transactionalEntityManager) => {
            await transactionalEntityManager.save(BookEntity, book);
            await transactionalEntityManager.save(BorrowEntity, borrow);
          },
        );
        return borrow;
      } else {
        return 'This book is currently unavailable';
      }
    }
  }

  async returnBook(bookId: number, userId: number):Promise<BorrowEntity[] | string> {
    const book = await BookEntity.findOneBy({ id: bookId });

    const borrowExist = await BorrowEntity.find({
      where: {
        bookId: bookId,
        userId: userId,
        returnDate: IsNull(),
      },
    });
    if (borrowExist.length == 0) {
      return 'Book Entry not found';
    } else {
      if (borrowExist.length > 0) {
        borrowExist[borrowExist.length - 1].returnDate = await new Date();
        book.stock += 1;
        await this.dataSource.manager.transaction(
          async (transactionalEntityManager) => {
            await transactionalEntityManager.save(BookEntity, book);
            await transactionalEntityManager.save(BorrowEntity, borrowExist);
          },
        );
        return await borrowExist;
      } else {
        return 'Issued book not found';
      }
    }
  }
}
