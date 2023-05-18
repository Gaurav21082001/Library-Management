import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/book/Entity/book.entity';
import { BorrowEntity } from './Entity/borrow.entity';
import { UserEntity } from 'src/user/Entity/user.entity';
import { DataSource, Transaction, getConnection, getManager } from 'typeorm';
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
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
      try {
        await queryRunner.manager.save(book);
        await queryRunner.manager.save(borrow);
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
        return borrow;
      }
    }
  }

  async returnBook(borrowId: number): Promise<string | BorrowEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const borrow = await BorrowEntity.findOneBy({ id: borrowId });
    const book = await BookEntity.findOneBy({ id: borrow.bookId });
    if (!borrow) {
      return 'Issued book not found';
    }
    borrow.returnDate = new Date();
    book.stock += 1;
    try {
      await queryRunner.manager.save(book);
      await queryRunner.manager.save(borrow);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      return borrow;
    }
  }
}
