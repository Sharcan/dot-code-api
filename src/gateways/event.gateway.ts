import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserModel } from './user.model';

@WebSocketGateway()
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  public users: Array<UserModel> = [];
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('newUserRemote')
  public onNewUser(@ConnectedSocket() client: Socket, @MessageBody() newUser: UserModel) {
    this.users.push(newUser);
    client.broadcast.emit('newUserRemote', newUser);
  }

  @SubscribeMessage('localCursorChange')
  public onLocalCursorChange(
    @ConnectedSocket() client: Socket,
    @MessageBody() values,
  ) {
    client.broadcast.emit('remoteCursorChange', values);
  }

  @SubscribeMessage('monacoPage')
  public onArriveOnMonacoPage(@ConnectedSocket() client: Socket) {
    client.emit('newUserLocal', {
      socketId: client.id,
      otherUsers: this.users.length > 0 ? this.users : [],
    });
  }

  /**
   * @param server
   */
  public afterInit(server: Server) {
    this.logger.log('Init');
  }

  /**
   * @param client
   */
  public handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(client);
  }

  /**
   * @param client
   */
  public handleDisconnect(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('disconnected', client.id);
    this.users.findIndex((value: UserModel) => value.socketId === client.id);
  }
}
