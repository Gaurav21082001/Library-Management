import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from './Entity/borrow.entity';
import { AuthorizedUserModule } from 'src/authorized_user/authorized_user.module';

@Module({
  imports:[TypeOrmModule.forFeature([BorrowEntity]),AuthorizedUserModule],
  controllers: [BorrowController],
  providers: [BorrowService]
})
export class BorrowModule {}
