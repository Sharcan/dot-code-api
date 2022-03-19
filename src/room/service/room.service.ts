import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RoomRepository} from "../repository/room.repository";

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
