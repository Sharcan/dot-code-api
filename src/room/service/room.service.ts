import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Room} from "../entity/room.entity";
import {Repository} from "typeorm";

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private readonly _roomRepository: Repository<Room>
    ) {
    }
}
