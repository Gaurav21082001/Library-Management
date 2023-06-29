import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Authorized_usersEntity } from './entity/authorized_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Authorized_UsersRepository } from './authorized_user.repository';
import { Update_authorized_user } from './dto/authorized_user.dto';
import { In } from 'typeorm';

@Injectable()
export class AuthorizedUserService {
  constructor(
    @InjectRepository(Authorized_usersEntity)
    private authorized_UsersRepository: Authorized_UsersRepository,
  ) {}

  async addRole(role: string) {
    const existingRole = await this.authorized_UsersRepository.findOneBy({
      roles: role,
    });
    if (existingRole) {
      throw new HttpException(
        'This role already exist',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.authorized_UsersRepository.save({ roles: role });
    }
  }

  async updateCRUDUsersAccess(role: Update_authorized_user) {
    console.log(role);
    return role.roles.map((role) => {
      const rolesString = JSON.stringify(role);
      const obj = JSON.parse(rolesString);
      for (var key in obj) {
        const query = this.authorized_UsersRepository
          .createQueryBuilder('authorized_role')
          .update(Authorized_usersEntity)
          .set({ hascrudaccess: obj[key] })
          .where('roles=:key', { key: key })
          .execute();
        return `key is ${key} and value is ${obj[key]}`;
      }
    });
  }

  async updateIRUsersAccess(role: Update_authorized_user) {
    console.log(role);
    return role.roles.map((role) => {
      const rolesString = JSON.stringify(role);
      const obj = JSON.parse(rolesString);
      for (var key in obj) {
        this.authorized_UsersRepository
          .createQueryBuilder('authorized_role')
          .update(Authorized_usersEntity)
          .set({ hasiraccess: obj[key] })
          .where('roles=:key', { key: key })
          .execute();
        return `key is ${key} and value is ${obj[key]}`;
      }
    });
  }

  async findOneByCRUDRole() {
    const rolesJson = await this.authorized_UsersRepository.find({
      where: {
        hascrudaccess: true,
      },
    });
    return rolesJson.map((role) => {
      return role.roles;
    });
  }
  async findOneByIRRole() {
    const rolesJson = await this.authorized_UsersRepository.find({
      where: {
        hasiraccess: true,
      },
    });
    return rolesJson.map((role) => {
      return role.roles;
    });
  }
}
