import { ArrayMinSize, IsOptional, IsString } from "class-validator";

export class Update_authorized_user{

    @ArrayMinSize(1)
    @IsString({each:true})
    authorized_users:string[];
}