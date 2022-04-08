import {EntityRepository, Repository, createQueryBuilder} from "typeorm";
import {Room} from "../entity/room.entity";

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {

    public getAllRoomInformation (roomPin: string) {
        return createQueryBuilder('room', 'r')
            .innerJoinAndSelect('r.team', 't')
            .leftJoinAndSelect('t.user', 'u')
            .where('r.pin = :pin', {pin: roomPin})
            .getOne();
    }
    
}