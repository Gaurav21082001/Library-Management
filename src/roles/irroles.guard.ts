import { AuthorizedUserService } from '../authorized_user/authorized_user.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { Request } from 'express';

import { Reflector } from '@nestjs/core';

@Injectable()
export class IRRolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authorizedUserService: AuthorizedUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = (await this.authorizedUserService.findOneByIRRole()).toString();
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      request['user'] = payload;
      if (request.user) {
        return roles.includes(request.user.role);
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
