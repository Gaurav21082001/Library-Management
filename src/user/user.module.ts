import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    providers:[UserService],
    exports:[UserService,UserModule]
})
export class UserModule {}
