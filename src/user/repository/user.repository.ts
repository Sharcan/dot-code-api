import {Repository, EntityRepository} from "typeorm";
import {Users} from "../entity/user.entity";
import {UserDto} from "../entity/user.dto";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {

    /**
     * Ajout d'un utilisateur dans la bdd
     *
     * @param userDto
     */
    createUser = async (userDto: UserDto) => {
        return await this.save(userDto);
    }
}