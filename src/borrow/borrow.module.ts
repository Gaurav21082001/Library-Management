import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from './Entity/borrow.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BorrowEntity])],
  controllers: [BorrowController],
  providers: [BorrowService]
})
export class BorrowModule {}
