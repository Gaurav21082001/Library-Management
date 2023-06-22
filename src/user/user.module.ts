import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserController],
    providers:[UserService,UserController],
    exports:[UserService,UserModule]
})
export class UserModule {}
