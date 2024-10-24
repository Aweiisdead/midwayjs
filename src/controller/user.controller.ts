import {
  Controller,
  Get,
  Inject,
  Query,
  Post,
  Body,
  Put,
  Del,
} from '@midwayjs/core';
import { UserService } from '../service/user.service';
// import { success } from '../utils/response';
// import type { response_type } from '../utils/response';
@Controller('/')
export class UserController {
  @Inject()
  userService: UserService;
  //登录
  @Get('/login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string
  ): Promise<any> {
    let obj = {
      username,
      password,
    };
    return this.userService.login(obj);
  }
  //获取用户列表
  @Get('/userList')
  async getUserList(@Query() query): Promise<any> {
    return this.userService.getUserPage(query);
  }
  @Post('/addUser')
  async addUser(@Body() params): Promise<any> {
    return this.userService.addUser(params);
  }
  @Put('/updateUser')
  async updateUser(@Body() params): Promise<any> {
    return this.userService.updateUser(params);
  }
  @Del('/deleteUser')
  async deleteUser(@Query('id') id: number): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
