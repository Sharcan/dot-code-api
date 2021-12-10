import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  public afterInit(server: Server) {
    this.logger.log('Init');
  }

  public handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client}`);
  }
  
  public handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client}`);
  }
}
