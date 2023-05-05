import {Entity,PrimaryGeneratedColumn,BaseEntity,Column} from 'typeorm'
@Entity('borrow')
export class BorrowEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    bookId:number;

    @Column()
    userId:number;

    @Column()
   issueDate:Date;


    @Column({default:null})
    returnDate:Date;
}