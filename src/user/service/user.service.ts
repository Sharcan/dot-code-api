import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {User} from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>
    ) {
    }

    public insertUser(user: User) {
        this._userRepository.insert(user).then(
            () => console.log('reussi')
        ).catch((e) => console.log(e));
    }
}
