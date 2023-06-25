import { Reflector } from '@nestjs/core';
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
import { Role } from 'src/roles/role.enum';

  
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService,private reflector:Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        
        request['user'] = payload;
      console.log(request.user.role);
        if(request.user){
            return request.user.role==Role.ADMIN;
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