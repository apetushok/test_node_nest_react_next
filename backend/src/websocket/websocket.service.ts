import { Injectable } from '@nestjs/common';
import { OPEN, WebsocketGateway } from './websocket.gateway';
import { NotificationTypeEnum } from './enums/notification.type.enum';

@Injectable()
export class WebsocketService {
  constructor(private websocketGateway: WebsocketGateway) {}

  sendMessage(message: NonNullable<unknown>, type: NotificationTypeEnum) {
    const clients = this.websocketGateway.server?.clients ?? null;
    if (clients === null) {
      return;
    }

    // Send message to all connected clients
    this.websocketGateway.server?.clients.forEach((client) => {
      if (client.readyState === OPEN) {
        client.send(JSON.stringify({ ...message, type }));
      }
    });
  }
}
