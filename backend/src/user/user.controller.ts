import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { WebsocketService } from '../websocket/websocket.service';
import { NotificationTypeEnum } from '../websocket/enums/notification.type.enum';
import { UserSettingsDto } from '../websocket/dto/mesage.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly websocketService: WebsocketService,
  ) {}

  @Get('/:username')
  async getUsers(
    @Param('username') username: string,
  ): Promise<{ bots: User[]; users: User[]; user: User }> {
    const user = await this.userService.getUserByName(username);
    // this.websocketService.sendMessage(
    //   { userId: user._id, addUser: user },
    //   NotificationTypeEnum.AddUser,
    // );

    const bots = await this.userService.getBots();
    const users = await this.userService.getActiveUsers();

    return { bots, users, user };
  }

  @Post('settings')
  async setUserSettings(@Body() userSettingsDto: UserSettingsDto) {
    await this.userService.updateUser(userSettingsDto);
    const users = await this.userService.getActiveUsers();

    this.websocketService.sendMessage({ users }, NotificationTypeEnum.AddUser);
  }
}
