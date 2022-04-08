import { User } from './../../user/entity/user.entity';
import { Room } from './../entity/room.entity';
import { RoomDto } from './../entity/room.dto';
import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RoomRepository} from "../repository/room.repository";
import { FindOneOptions } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomRepository)
        private readonly _roomRepository: RoomRepository
    ) {
    }

    public getAllRoomInformation(roomPin: string) {
        return this._roomRepository.getAllRoomInformation(roomPin);
    }

    /**
     * Generate new pin for room
     * 
     * @returns string
     */
    public generatePin(): string
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

    public async changeOwner(room_id: number, owner: User)
    {
        this._roomRepository.update(room_id, { owner: owner });
    }

    public async changeOwnerRandom(room_id: number)
    {
        const room = await this._roomRepository.findOne(room_id, {
            relations: ['users']
        });

        console.log(room);

        if(!room.users?.length) {
            console.log('here');
            await this._roomRepository.update(room.id, { owner: null });
        } else {
            const owner = room.users[Math.floor(Math.random() * room.users.length)];
            await this._roomRepository.update(room.id, { owner: owner });
        }
    }

    public findOne(id: number | string, options?: FindOneOptions<Room>) {
        return this._roomRepository.findOne(id, options);
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
