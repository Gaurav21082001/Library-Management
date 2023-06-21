import {Entity,PrimaryGeneratedColumn,BaseEntity,Column,Index} from 'typeorm'
@Entity('book')
export class BookEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Index()
    @Column()
    title:string;

    @Column()
    details:string;

    @Index()
    @Column()
    author:string;

    @Column({default:true})
    isAvailable:boolean;

    @Column()
    stock:number;
}