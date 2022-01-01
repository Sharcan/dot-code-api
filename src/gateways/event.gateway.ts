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

  // Utilisateurs qui sont connectés à une room
  public usersConnectedToARoom: {socketId: string, pin: string, username?: string}[] = []


  /** Reception des sockets */

  /**
   * A la création d'une nouvelle room
   * 
   * @param client 
   * @returns 
   */
  @SubscribeMessage('newRoomCreation')
  public newRoomCreation(@ConnectedSocket() client: Socket) {
    const response = this.roomController.createRoom();
    if (response.pin) {
      // On connecte l'utilisateur à la room
      client.join(response.pin);
      this.usersConnectedToARoom.push({
        socketId: client.id,
        pin: response.pin
      })
    }
    return response;
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
     const response = this.roomController.connectToRoom(body.pin, client.id);
     if (response.pin) {
        // On connecte l'utilisateur à la room
        client.join(response.pin);
        this.usersConnectedToARoom.push({
          socketId: client.id,
          pin: response.pin
        })
     }
     return response;
   }

   
   /**
    * Lorsqu'un utilisateur rejoins une team avec un pseudo
    * 
    * @param client 
    * @param body 
    */
   @SubscribeMessage('newUser')
   public newUser(@ConnectedSocket() client: Socket, @MessageBody() body) {
     const response = this.roomController.joinTeam(client.id, body.pin, body.username, body.team);
     if (response.message) {
        // On connecte l'utilisateur à la room
        client.join(response.pin);
        this.usersConnectedToARoom.forEach((user: {socketId: string, pin: string, username?: string}) => {
          if (user.socketId === client.id) {
            user.username = response.username;
          }
        });
     }
     console.log(this.roomController.rooms);
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
  
  /**
   * Lorsqu'un utilisateur quitte la room on le supprime de la team
   * 
   * @param client 
   */
  public handleDisconnect(client: Socket) {
    const userFound = this.usersConnectedToARoom.find((user: {socketId: string, pin: string}) => user.socketId === client.id);
    if (userFound) {
      const response: {message?: string, error?: string, pin?: string} = this.roomController.leaveTeam(userFound.pin, userFound.socketId, userFound.username);

      if (response.message) {
        client.to(response.pin).emit('userHasDisconnected', 'An user has disconnected');
      }
    }
    console.log(this.roomController.rooms);
  }
}
