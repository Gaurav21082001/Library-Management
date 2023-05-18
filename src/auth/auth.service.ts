import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,  private jwtService: JwtService) {}

  async signIn(email, pass): Promise<any> {
    const user = await this.userService.findOneBy(email);
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, userId: user.id };
    return {
      token: await this.jwtService.sign(payload),
    };
  }
}
