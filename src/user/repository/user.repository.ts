import {Repository, EntityRepository} from "typeorm";
import {User} from "../entity/user.entity";
import {UserDto} from "../entity/user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
}