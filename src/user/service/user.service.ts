import { Room } from './../../room/entity/room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {User} from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>
    ) {}

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
}
