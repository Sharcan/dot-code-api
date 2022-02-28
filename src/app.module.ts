import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventGateway } from './gateways/event.gateway';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RoomModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, EventGateway],
})
export class AppModule {}
