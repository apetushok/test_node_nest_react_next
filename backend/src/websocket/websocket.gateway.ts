import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'ws';

export const OPEN: number = 1;

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  afterInit(server: Server) {
    console.log('WebSocket gateway initialized');
  }

  handleMessage(client: any, message: string) {
    console.log(`Received message from client: ${message}`);
    // Handle the message here and broadcast it to other clients if needed
    this.server.clients.forEach((c) => {
      if (c !== client && c.readyState === OPEN) {
        c.send(message);
      }
    });
  }
}
