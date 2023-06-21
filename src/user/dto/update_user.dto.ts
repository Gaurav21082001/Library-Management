import { IsEmail,IsNotEmpty,Validate } from "class-validator";
import { Unique } from "typeorm";

export class UpdateUserDto{
    firstName?:string;
    lastName?:string;
   
    email?:string;
   
    password?:string;
    contactNo?:string;
}