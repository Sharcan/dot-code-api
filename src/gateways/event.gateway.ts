import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


  /**
   * Reception des sockets
   */
  @SubscribeMessage('newRoom')
  public newRoom(@ConnectedSocket() client: Socket) {

  }


  /**
   * Envoie des sockets
   */



  /**
   * Connexion à socket
   */
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
