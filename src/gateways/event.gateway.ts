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

@WebSocketGateway({cors:true})
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  public roomController: RoomController = new RoomController();

  // Utilisateurs qui sont connectés à une room
  public usersConnectedToARoom: {socketId: string, pin: string, username?: string}[] = []


  /** Reception des sockets */

  /**
   * Get all rooms
   * 
   * @param client 
   * @returns 
   */
  @SubscribeMessage('getRooms')
  public getRooms() 
  {
    return this.roomController.getRooms();
  }

  /**
   * A la création d'une nouvelle room
   * 
   * @param client 
   * @returns 
   */
  @SubscribeMessage('newRoomCreation')
  public newRoomCreation(@ConnectedSocket() client: Socket) 
  {
    const response = this.roomController.createRoom(client.id);
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
   * Connexion à une room
   * 
   * @param client 
   * @param body 
   * @returns 
   */
   @SubscribeMessage('roomConnection')
   public roomConnection(@ConnectedSocket() client: Socket, @MessageBody() body) 
   {
     const res = this.roomController.connectToRoom(body.pin, client.id);

     if (res.pin) {
        // On connecte l'utilisateur à la room
        client.join(res.pin);

        this.usersConnectedToARoom.push({
          socketId: client.id,
          pin: res.pin
        })
     }

     return res;
   }
   
   /**
    * Lorsqu'un utilisateur entre son pseudo
    * 
    * @param client 
    * @param body 
    */
   @SubscribeMessage('sendPseudo')
   public sendPseudo(@ConnectedSocket() client: Socket, @MessageBody() body) 
   {
      const res = this.roomController.setUsername(client.id, body.pin, body.username);

      if(!res.error) {
        this.usersConnectedToARoom.forEach((user: {socketId: string, pin: string, username?: string}) => {
          if (user.socketId === client.id) {
            user.username = body.username;
          }
        });

        client.broadcast.emit('newUserConnected', {
          user: { socketId: res.socketId, username: res.username }
        });
      }

      return res;
   }

   /**
    * User join a team
    * 
    * @param client 
    * @param body 
    */
   @SubscribeMessage('joinTeam')
   public joinTeam(@ConnectedSocket() client: Socket, @MessageBody() body)
   {
      const res = this.roomController.joinTeam(client.id, body.pin, body.team);

      if(!res.error) {
        client.broadcast.emit('userJoinTeam', {
          user: res.user,
          team: body.team
        });
      }

      return res;
   }

  /**
  * Get connected users of a room
  * 
  * @param client 
  * @param body 
  */
  @SubscribeMessage('getConnectedUsers')
  public getConnectedUsers(@ConnectedSocket() client: Socket, @MessageBody() body)
  {
    const res = this.roomController.getConnectedUsers(body.pin, client.id);
    
    return res;
  }

  /**
  * Launch the game
  * 
  * @param client 
  * @param body 
  */
  @SubscribeMessage('launchGame')
  public launchGame(@ConnectedSocket() client: Socket, @MessageBody() body)
  {
    const res = this.roomController.launchGame(body.pin);

    if(!res.error) {
      client.broadcast.emit('launchGame');
    }

    return res;
  }

  /**
   * When next exercice is reached
   * 
   * @param client 
   * @param body 
   */
  @SubscribeMessage('nextExercice')
  public nextExercice(@ConnectedSocket() client: Socket, @MessageBody() body)
  {
    const res = this.roomController.nextExercice(body.pin, client.id);

    if(!res.error) {
      client.broadcast.emit('opponentSuccess');
    }

    return res;
  }

  /**
   * On envoie la position du nouveau cursor à l'ensemble des users de la ROOM à l'exception de l'envoyeur
   * 
   * @param client 
   * @param body 
   */
  @SubscribeMessage('gamerCursorChange')
  public gamerCursorChange(@ConnectedSocket() client: Socket, @MessageBody() body) {
    client.to(body.pin).emit('gamerCursorChange', body);
  }

  /**
   * Lorsqu'on ecrit dans l'ide
   * 
   * @param client 
   * @param values 
   */
  @SubscribeMessage('newTextInsert')
  public onTextInsert(
    @ConnectedSocket() client: Socket,
    @MessageBody() body,
  ) {
    client.to(body.pin).emit('newTextInsert', body);
  }

  /**
   * Lorsqu'on supprime dans l'ide
   * 
   * @param client 
   * @param values 
   */
  @SubscribeMessage('newTextDelete')
  public onTextDelete(
    @ConnectedSocket() client: Socket,
    @MessageBody() body,
  ) {
    client.to(body.pin).emit('newTextDelete', body);
  }

  /**
   * Lorsqu'on supprime dans l'ide
   * 
   * @param client 
   * @param values 
   */
  @SubscribeMessage('onTab')
  public onTab(
    @ConnectedSocket() client: Socket,
    @MessageBody() body,
  ) {
   client.to(body.pin).emit('onTab', body);
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
