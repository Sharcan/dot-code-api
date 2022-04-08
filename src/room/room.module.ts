import { Module } from '@nestjs/common';
import { RoomController } from './controller/room.controller';
import { RoomService } from './service/room.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Room} from "./entity/room.entity";
import {RoomRepository} from "./repository/room.repository";
import {UserService} from "../user/service/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomRepository]), UserService],
  exports: [TypeOrmModule, RoomService],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
