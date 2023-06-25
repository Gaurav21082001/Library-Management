import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('authorized_users')
export class Authorized_usersEntity{
    @PrimaryGeneratedColumn()
    id:number;

    
    @Column('simple-array')
     authorized_users:string[];
}