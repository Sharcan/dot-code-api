import {EntityRepository, Repository} from "typeorm";
import {Room} from "../entity/room.entity";

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
    createRoom = async (roomDto) => {
        return await this.save(roomDto);
    }
}