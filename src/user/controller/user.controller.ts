import { RoomService } from 'src/room/service/room.service';
import { Delete, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import { UserDto } from "../entity/user.dto";
import { UserRepository } from "../repository/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _roomService: RoomService
    ) {
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this._userRepository.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() userDto: UserDto) {
        if(userDto.password) {
            const password: number = parseInt(process.env.BCRYPT_SALT, 10);
            userDto.password = await bcrypt.hash(userDto.password, password);
        }
        return this._userRepository.save(userDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto) {
        return this._userRepository.update(id, userDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this._userRepository.delete(id);
    }

    /**
     * Connect user to a room
     * 
     * @param id 
     * @param room_id 
     */
    @Patch(':id/connect')
    connect(@Param('id') id: string, @Body() userDto: UserDto) {
        if(!userDto.room) {
            return false;
        }
        
        this._userRepository.update(id, { room: userDto.room });
    }

    /**
     * Disonnect user from any room
     * 
     * @param id
     */
    @Patch(':id/disconnect')
    async disconnect(@Param('id') id: string) {
        // Get user
        const user = await this._userRepository.findOne(id, {
            relations: ['room']
        });
        if(!user || !user.room) {
            return false;
        }

        // Disconnect user from room
        this._userRepository.update(id, { room: null });

        // Get room and update owner
        this._roomService.changeOwnerRandom(user.room.id);
    }
}
