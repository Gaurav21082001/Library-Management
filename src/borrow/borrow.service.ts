import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/book/Entity/book.entity';
import { BorrowEntity } from './Entity/borrow.entity';
import { UserEntity } from 'src/user/Entity/user.entity';

@Injectable()
export class BorrowService {

    async showBorrow(){
        const borrow=new BorrowEntity();
        return borrow;
    }
    async issueBook(bookId:number,userId:number){
        const book=await BookEntity.findOneBy({ id: bookId});
        const user=await UserEntity.findOneBy({id:userId})
        const borrow=new BorrowEntity();
        if(!book || !user){
            return 'User or Book not found'
        }
        if(book.stock<=0){
            return 'Book is not available'
        }
        book.stock-=1;
        book.save();

        borrow.bookId=bookId;
        borrow.userId=userId;
        borrow.issueDate=new Date();
        borrow.save();
        return borrow;
    }
}
