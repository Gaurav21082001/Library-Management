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

  @Post('addrole')
  @UseGuards(AdminGuard)
  async addRole(@Body('role') role: string) {
    return this.authorizedUserService.addRole(role);
  }

  @Put('crud/users')
  @UseGuards(AdminGuard)
  async updateCRUDUsersAccess(@Body() roles: Update_authorized_user) {
    return await this.authorizedUserService.updateCRUDUsersAccess(roles);
  }

  @Put('ir/users')
  @UseGuards(AdminGuard)
  async updateIRUsersAccess(@Body() roles: Update_authorized_user) {
    return await this.authorizedUserService.updateIRUsersAccess(roles);
  }

  @Get('crud/userInfo')
  async findOneByCRUDRole() {
    return this.authorizedUserService.findOneByCRUDRole();
  }
  @Get('ir/userInfo')
  async findOneByIRRole() {
    return this.authorizedUserService.findOneByIRRole();
  }
}
