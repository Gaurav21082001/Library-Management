import { AuthorizedUserService } from './authorized_user.service';
import { Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AdminGuard } from 'src/roles/admin.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Authorized_usersEntity } from './entity/authorized_user.entity';
import { Update_authorized_user } from './dto/authorized_user.dto';

@Controller('authorized-user')
export class AuthorizedUserController {
  constructor(private authorizedUserService: AuthorizedUserService) {}

  @Post('users')
  @UseGuards(AdminGuard)
  async addUsers(@Body('role') role) {
    return this.authorizedUserService.addUsers(role);
  }

  @Put('users')
  @UseGuards(AdminGuard)
  async updateUser(@Body() authorized_users:Update_authorized_user):Promise<Authorized_usersEntity> {
    return this.authorizedUserService.updateUser(authorized_users);
  }

  @UseGuards(AdminGuard)
  @Get('userInfo')
  async findOneById(id: number) {
    return this.authorizedUserService.findOneById(id);
  }
}
