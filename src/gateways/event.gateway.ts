import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  public handleMessage(client: any, payload: any): void {
    this.server.emit('msgToClient', payload);
    this.logger.log('Je suis un message du front')
  }

  public afterInit(server: Server) {
    this.logger.log('Init')
  }

  public handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client}`);
   console.log(client.connect);
  }
  
  public handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client}`);
  }

}
