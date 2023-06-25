
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorized_usersEntity } from './entity/authorized_user.entity';
import { AuthorizedUserService } from './authorized_user.service';
import { Authorized_UsersRepository } from './authorized_user.repository';
import { AuthorizedUserController } from './authorized_user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Authorized_usersEntity])],
  controllers:[AuthorizedUserController],
  providers:[AuthorizedUserService,Authorized_UsersRepository],
  exports:[Authorized_UsersRepository,AuthorizedUserService]
})
export class AuthorizedUserModule {}
