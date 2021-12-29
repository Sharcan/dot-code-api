import { Module } from '@nestjs/common';
import { RoomController } from './controller/room.controller';

@Module({
  controllers: [RoomController]
})
export class RoomModule {}
