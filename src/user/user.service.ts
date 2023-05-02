import { UpdateUserDto } from './DTO/updateUser.dto';
import { AddUserDto } from './DTO/addUser.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './Entity/user.entity';

@Injectable()
export class UserService {
    async getUser() {
        return await UserEntity.find();
    }

    async addUser(addUserDto: AddUserDto) {
        const user = new UserEntity();
        user.firstName = addUserDto.firstName;
        user.lastName = addUserDto.lastName;
        user.email = addUserDto.email;
        user.role=addUserDto.role;
        user.password = addUserDto.password;
        user.contactNo = addUserDto.contactNo;
        await user.save();
        return user;
    }

    async updateUserDetails(id: number, updateUserDto: UpdateUserDto) {
        const user = await UserEntity.findOneBy({ id: id });
        if (!user) {
            return 'User Not Found';
        } else {
            user.firstName = updateUserDto.firstName;
            user.lastName = updateUserDto.lastName;
            user.email = updateUserDto.email;
            user.password = updateUserDto.password;
            user.contactNo = updateUserDto.contactNo;
            await user.save();
            return user;
        }

    }
}
