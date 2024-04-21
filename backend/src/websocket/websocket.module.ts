import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketController } from './websocket.controller';
import { WebsocketService } from './websocket.service';

@Module({
  providers: [WebsocketGateway, WebsocketService],
  controllers: [WebsocketController],
  exports: [WebsocketService],
})
export class WebsocketModule {}
