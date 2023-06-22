import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { ObjectType, IsNull } from 'typeorm';

export class GetBooksQueryInput {
  @IsString()
  column: string;

  direction: 'ASC' | 'DESC';
  
  limit?: string;

  startCursor?: string;
   
  endCursor?: string;
}
