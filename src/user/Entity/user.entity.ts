import { IsEmail,IsNotEmpty,Validate } from 'class-validator';
import {Entity,PrimaryGeneratedColumn,BaseEntity,Column, Unique} from 'typeorm'
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

    @Column({unique: true})
    @IsEmail()
    // @Validate(Unique)
    email:string;

    @Column()
    @IsNotEmpty()
    password:string;

    @Column()
    contactNo:string;


}