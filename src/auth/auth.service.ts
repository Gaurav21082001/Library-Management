import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as crypto from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,  private jwtService: JwtService) {}

  async signIn(email,pass): Promise<any> {
    const user = await this.userService.findOneBy(email.trim());
    const hash=await String(crypto.SHA256(pass));
    if(user){
     if (user.password===hash) {
        const payload = { email: user.email, userId: user.id };
        return {
          token: await this.jwtService.sign(payload),
        };
        }
      else{
      return 'Please check password'
    }
  }
    else{
      return 'User does not exist! Please check username.'
    }
    
  }
}
