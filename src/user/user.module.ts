import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])]
})
export class UserModule {}
