import { Room } from '../../room/entity/room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {CreateGuestUserDto} from "../dto/create-guest-user.dto";
import {UserRepository} from "../repository/user.repository";
import {ConnectInRoomUserDto} from "../dto/connect-in-room-user.dto";
import {FindOneOptions} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly _userRepository: UserRepository,
    ) {
    }

    public async getUserById(id: number): Promise<User>
    {
        const user = await this._userRepository.findOne({ where: { id } });

        if(!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }

        return user;
    }

    public async updateUserRoom(id: number, room: Room): Promise<User>
    {
        const user = await this.getUserById(id);

        user.room = room;
        await this._userRepository.save(user);

        return user;
    }

    /**
     * Create a guest user (When he connects on the landing page)
     *
     * @param userGuest
     */
    public createGuestUser(userGuest: CreateGuestUserDto) {
        return this._userRepository.createGuestUser(userGuest);
    }

    /**
     * When a user join a Room
     *
     * @param userId
     * @param updateUserDto
     * @param room
     */
    public updateUserForRoom(userId: string, updateUserDto: ConnectInRoomUserDto, room: Room) {
        return this._userRepository.updateUserForRoom(userId, updateUserDto, room)
    }

    /**
     * Return user with his room
     *
     * @param id
     * @param options
     */
    public getOne(id: string, options: FindOneOptions) {
        return this._userRepository.findOne(id, options);
    }

    /**
     * Remove room on user
     *
     * @param id
     */
    public updateNullRoom(id: string) {
        return this._userRepository.update(id, {room: null});
    }
}
