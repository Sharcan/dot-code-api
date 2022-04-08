import { RoomService } from 'src/room/service/room.service';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateGuestUserDto } from "../dto/create-guest-user.dto";
import {UserService} from "../service/user.service";
import {ConnectInRoomUserDto} from "../dto/connect-in-room-user.dto";

@Controller('user')
export class UserController {

    constructor(
        private readonly _userService: UserService,
        private readonly _roomService: RoomService
    ) {
    }

    /**
     * Create user guest when he connects on the landing page
     *
     * @param userGuestDto
     */
    @Post('guest')
    @UsePipes(new ValidationPipe({ transform: true }))
    public createGuestUser(@Body() userGuestDto: CreateGuestUserDto) {
        return this._userService.createGuestUser(userGuestDto);
    }

    /**
     * Update user when he joins a room
     *
     * @param id
     * @param updateUserDto
     */
    @Patch(':id/connect')
    public async connect(@Param('id') id: string, @Body() updateUserDto: ConnectInRoomUserDto) {
        const room = await this._roomService.getRoomById(updateUserDto.room_id);

        return this._userService.updateUserForRoom(id, updateUserDto, room);
    }

    @Patch(':id/disconnect')
    public async disconnect(@Param('id') id: string) {
        // Get user
        const user = await this._userService.getOne(id, {
            relations: ['room']
        });

        if(!user || !user.room) {
            return false;
        }

        // Disconnect user from room
        await this._userService.updateNullRoom(id);

        // Get room and update owner
        await this._roomService.changeOwnerRandom(user.room.id);
    }

}
