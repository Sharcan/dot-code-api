import { Module } from '@nestjs/common';
import { RoomController } from './controller/room.controller';
import { RoomService } from './service/room.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Room} from "./entity/room.entity";
import {RoomRepository} from "./repository/room.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomRepository])],
  exports: [TypeOrmModule],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
