import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BorrowEntity } from "./Entity/borrow.entity";

@Injectable()
export class BorrowRepository extends Repository<BorrowEntity>{}