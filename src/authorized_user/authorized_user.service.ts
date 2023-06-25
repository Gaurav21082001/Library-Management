import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { Authorized_usersEntity } from './entity/authorized_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Authorized_UsersRepository } from './authorized_user.repository';

@Injectable()
export class AuthorizedUserService {
  constructor(
    @InjectRepository(Authorized_usersEntity)
    private authorized_UsersRepository: Authorized_UsersRepository,
  ) {}

  async addUsers(role) {
    // return role;
    const user=new Authorized_usersEntity();
    user.authorized_users=["librarian"];
    await this.authorized_UsersRepository.save(user);
  }

  async updateUser(role) {
    // return role;
    const user=await this.authorized_UsersRepository.findOneBy({id:1})
    user.authorized_users=role;
    await this.authorized_UsersRepository.save(user);
    throw new HttpException('Updated successfully', HttpStatus.OK);
  }

  async findOneById(id){
    const user=await this.authorized_UsersRepository.findOneBy({id:1});
    return await user.authorized_users;
  }
}
