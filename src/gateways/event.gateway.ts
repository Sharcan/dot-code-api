import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'http';
import { RoomController } from 'src/room/controller/room.controller';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  public roomController: RoomController = new RoomController();

  /** Reception des sockets */

  /**
   * A la création d'une nouvelle room
   * 
   * @param client 
   * @returns 
   */
  @SubscribeMessage('newRoomCreation')
  public newRoomCreation(@ConnectedSocket() client: Socket) {
    return this.roomController.createRoom();
  }

  /**
   * A la connexion à une room
   * 
   * @param client 
   * @param body 
   * @returns 
   */
   @SubscribeMessage('roomConnection')
   public roomConnection(@ConnectedSocket() client: Socket, @MessageBody() body) {
     return this.roomController.connectToRoom(body.pin, client.id);
   }

   @SubscribeMessage('newUser')
   public newUser(@ConnectedSocket() client: Socket, @MessageBody() body) {
     this.roomController.joinTeam(client.id, body.pin, body.username, body.team);
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
