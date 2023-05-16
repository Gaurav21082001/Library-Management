import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/book/Entity/book.entity';
import { BorrowEntity } from './Entity/borrow.entity';
import { UserEntity } from 'src/user/Entity/user.entity';
import {
  DataSource,
  Transaction,
  getConnection,
  getManager,
  getRepository,
} from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { BorrowRepository } from './borrow.repository';

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
  ): Promise<string | BorrowEntity> {
    const book = await BookEntity.findOneBy({ id: bookId });
    const user = await UserEntity.findOneBy({ id: userId });
    const borrow = new BorrowEntity();
    if (!book) {
      return ' Book not found';
    }
    if (!user) {
      return ' User not found';
    }
    if (book.stock > 0) {
      book.stock -= 1;
      borrow.bookId = bookId;
      borrow.userId = userId;
      borrow.issueDate = new Date();
      await this.dataSource.manager.transaction(
        async (transitionEntityManager) => {
          await transitionEntityManager.save(BookEntity, book);
          await transitionEntityManager.save(BorrowEntity, borrow);
        },
      );
      return borrow;
    }
  }

  async returnBook(borrowId: number): Promise<string | BorrowEntity> {
    const borrow = await BorrowEntity.findOneBy({ id: borrowId });
    const book = await BookEntity.findOneBy({ id: borrow.bookId });
    if (!borrow) {
      return 'Issued book not found';
    }
    borrow.returnDate = new Date();
    book.stock += 1;
    await this.dataSource.manager.transaction(
      async (transitionEntityManager) => {
        await transitionEntityManager.save(BookEntity, book);
        await transitionEntityManager.save(BorrowEntity, borrow);
      },
    );
    return borrow;
  }
}
