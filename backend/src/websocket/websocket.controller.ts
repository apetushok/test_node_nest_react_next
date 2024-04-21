import { Controller, Post, Body } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { MessageDto, UserIdDto, UserSettingsDto } from './dto/mesage.dto';
import { NotificationTypeEnum } from './enums/notification.type.enum';

@Controller()
export class WebsocketController {
  constructor(private readonly websocketService: WebsocketService) {}

  @Post('message')
  sendMessage(@Body() messageDto: MessageDto): void {
    this.websocketService.sendMessage(messageDto, NotificationTypeEnum.Message);
  }

  @Post('generate')
  generateScore(@Body() userIdDto: UserIdDto): void {
    const score = Math.floor(Math.random() * 1000) + 1.0;
    this.websocketService.sendMessage(
      { ...userIdDto, score },
      NotificationTypeEnum.Score,
    );
  }
}
