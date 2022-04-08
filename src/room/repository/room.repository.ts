import { AccessEnum, StatusEnum } from '../enums/access.enum';
import { uuid } from 'uuidv4';
import { CreateRoomDto } from '../dto/create-room.dto';
import { EntityRepository, Repository, createQueryBuilder } from "typeorm";
import { Room } from "../entity/room.entity";

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {

    public getAllRoomInformation (roomPin: string)
    {
        return createQueryBuilder('room', 'r')
            .innerJoinAndSelect('r.team', 't')
            .leftJoinAndSelect('t.user', 'u')
            .where('r.pin = :pin', {pin: roomPin})
            .getOne();
    }
    
    public async createRoom(createRoomDto: CreateRoomDto, pin: string, name: string): Promise<Room>
    {
        const { owner } = createRoomDto;

        const room = this.create({
            slug: uuid(),
            pin,
            name,
            owner,
            access: AccessEnum.PRIVATE,
            status: StatusEnum.ON
        });

        await this.save(room);
        return room;
    }
}