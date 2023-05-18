import { UpdateUserDto } from './dto/update_user.dto';
import { AddUserDto } from './dto/add_user.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './Entity/user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: UserRepository,
  ) {}

  async getUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async addUser(input: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save({ ...input });
  }

  async updateUserDetails(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | string> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      return 'User Not Found';
    } else {
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      user.email = updateUserDto.email;
      user.password = updateUserDto.password;
      user.contactNo = updateUserDto.contactNo;
      return await this.userRepository.save(user);
    }
  }

  async findOneBy(email): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }
}
