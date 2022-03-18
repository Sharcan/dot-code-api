import { Delete, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import {UserDto} from "../entity/user.dto";
import {UserRepository} from "../repository/user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {

    constructor(
        @InjectRepository(UserRepository) 
        private readonly _userRepository: UserRepository
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
        return this._userRepository.insert(userDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto) {
      return this._userRepository.update(id, userDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this._userRepository.delete(id);
    }
}
