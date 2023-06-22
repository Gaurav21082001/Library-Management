import { IsEmail,IsNotEmpty,Validate } from "class-validator";
import { Unique } from "typeorm";

export class AddUserDto{
    firstName:string;
    lastName:string;
    role:string;
    
    email:string;
    
    password:string;
    contactNo:string;
}