import { CreateRoomDto } from '../dto/create-room.dto';
import { User } from '../../user/entity/user.entity';
import { Room } from '../entity/room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { RoomRepository } from "../repository/room.repository";

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomRepository)
        private readonly _roomRepository: RoomRepository
    ) {
    }

    public async getRoomById(id: number): Promise<Room>
    {
        const room = await this._roomRepository.findOne({ where: { id } });

        if(!room) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return room;
    }

    public async getRoomByPin(pin: string): Promise<Room>
    {
        const room = await this._roomRepository.findOne({ where: { pin } });

        if(!room) {
            throw new NotFoundException(`Task with ID "${pin}" not found`);
        }

        return room;
    }

    public createRoom(createRoomDto: CreateRoomDto): Promise<Room>
    {
        const pin = this.generatePin();
        const name = 'Room ' + pin;

        return this._roomRepository.createRoom(createRoomDto, pin, name);
    }

    public async changeOwner(room_id: number, owner: User)
    {
        this._roomRepository.update(room_id, { owner: owner });
    }

    public async changeOwnerRandom(room_id: number)
    {
        const room = await this._roomRepository.findOne(room_id, {
            relations: ['users']
        });

        if(!room.users?.length) {
            console.log('here');
            await this._roomRepository.update(room.id, { owner: null });
        } else {
            const owner = room.users[Math.floor(Math.random() * room.users.length)];
            await this._roomRepository.update(room.id, { owner: owner });
        }
    }

    public async deleteRoom(id: number): Promise<void>
    {
        const result = await this._roomRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Room with ID "${id}" not found`);
        }
    }

    public getRoomsInformation(query) {
        return this._roomRepository.find({
            where: query,
        }, )
    }

    /**
     * Generate new pin for room
     * 
     * @returns string
     */
     private generatePin(): string
     {
         const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
         let newPin = '';
 
         newPin = '';
         while (newPin.length < 4) {
           const isNoL = this.__getRandomInt(2);
           newPin += isNoL === 0 ? alphabet.charAt(this.__getRandomInt(alphabet.length)) : this.__getRandomInt(10);
         }
     
         return newPin;
     }

    /**
     * Get random integer
     * 
     * @param max 
     * @returns number
    */
    private __getRandomInt(max: number): number
    {
    return Math.floor(Math.random() * Math.floor(max));
    }
}
