import { UpdateUserDto } from './DTO/updateUser.dto';
import { AddUserDto } from './DTO/addUser.dto';
import { UserService } from './user.service';
import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { UserEntity } from './Entity/user.entity';

@Controller('user')
export class UserController {
    
    constructor(private userService:UserService){}

    @Get()
    async getUsers(){
        return this.userService.getUser();
    }
    @Post()
    async addUser(@Body() body: UserEntity){
        return this.userService.addUser(body);
    }

    @Put(':id')
    async updateUserDetails(@Param('id') id:number,@Body() updateUserDto:UpdateUserDto){
        return this.userService.updateUserDetails(id,updateUserDto);
    }

}
