import {Body, Controller, Post} from '@nestjs/common';
import {UserDto} from "../entity/user.dto";
import {UserRepository} from "../repository/user.repository";
import {InjectRepository} from "@nestjs/typeorm";

@Controller('user')
export class UserController {

    constructor(
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository
    ) {
    }

    @Post()
    public create(@Body() userDto: UserDto) {
        return this._userRepository.createUser(userDto);
    }

}
