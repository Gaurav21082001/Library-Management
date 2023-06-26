import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { Authorized_usersEntity } from './entity/authorized_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Authorized_UsersRepository } from './authorized_user.repository';
import { Update_authorized_user } from './dto/authorized_user.dto';

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

  async updateUser(update_authorized_user:Update_authorized_user):Promise<Authorized_usersEntity> {
    // return role;
    const user=await this.authorized_UsersRepository.findOneBy({id:1});
    console.log(update_authorized_user.authorized_users);
    user.authorized_users=update_authorized_user.authorized_users;
   const response=await this.authorized_UsersRepository.save(user);
    throw new HttpException(
      `${response.id,response.authorized_users} Updated successfully`,
      HttpStatus.OK,
    );
    return user;
    // throw new HttpException('Updated successfully', HttpStatus.OK);
  }

  async findOneById(id){
    const user=await this.authorized_UsersRepository.findOneBy({id});
    return await user.authorized_users;
  }
}
