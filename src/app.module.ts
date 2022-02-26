import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeMonacoModule } from './ide-monaco/ide-monaco.module';
import { EventGateway } from './gateways/event.gateway';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    IdeMonacoModule, 
    RoomModule
  ],
  controllers: [AppController],
  providers: [AppService, EventGateway],
})
export class AppModule {}
