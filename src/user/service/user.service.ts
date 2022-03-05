import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {Users} from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly _userRepository: Repository<Users>
    ) {
    }

    public insertUser(user: Users) {
        this._userRepository.insert(user).then(
            () => console.log('reussi')
        ).catch((e) => console.log(e));
    }
}
