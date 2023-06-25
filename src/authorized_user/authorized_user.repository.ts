import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Authorized_usersEntity } from './entity/authorized_user.entity';

@Injectable()
export class Authorized_UsersRepository extends Repository<Authorized_usersEntity> {

    
}
