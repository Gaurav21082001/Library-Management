import { UpdateUserDto } from './dto/update_user.dto';
import { AddUserDto } from './dto/add_user.dto';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Req,
  Post,
  Param,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from './Entity/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
  @Get()
  async getUser() {
    return this.userService.getUsers();
  }
  
  @Post()
  async addUser(@Body() body: UserEntity) {
    return this.userService.addUser(body);
  }

  @Put(':id')
  async updateUserDetails(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserDetails(id, updateUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() request) {
    return request.user;
  }

  
}
