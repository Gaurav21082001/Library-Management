import {Entity,PrimaryGeneratedColumn,BaseEntity,Column} from 'typeorm'
@Entity('user')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;


    @Column({default:'student'})
    role:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    contactNo:string;


}