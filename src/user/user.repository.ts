import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./Entity/user.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity>{}