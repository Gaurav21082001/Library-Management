import { Injectable } from '@nestjs/common';

@Injectable()
export class CursorService {
  encodeCursor(value: string): string {
    const encodedValue = Buffer.from(value).toString('base64');
    return encodedValue;
  }

  decodeCursor(encodedValue:string): string {
    // console.log(encodedValue);
    const decodedValue = Buffer.from(encodedValue, 'base64').toString('utf-8');
    return decodedValue;
  }
}
