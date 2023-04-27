import {Entity,PrimaryGeneratedColumn,BaseEntity,Column} from 'typeorm'
@Entity('book')
export class BookEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    details:string;

    @Column()
    author:string;

    @Column({default:1})
    isAvailable:number;

    @Column()
    stock:number;
}