import {Repository, EntityRepository} from "typeorm";
import {User} from "../entity/user.entity";
import {CreateGuestUserDto} from "../dto/create-guest-user.dto";
import {uuid} from "uuidv4";
import {Room} from "../../room/entity/room.entity";
import {ConnectInRoomUserDto} from "../dto/connect-in-room-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    /**
     * Création d'un utilisateur guest (lors de sa connection sur la page home)
     *
     * @param userGuestDto
     */
    public async createGuestUser(userGuestDto: CreateGuestUserDto) {
        const user = this.create({
            slug: uuid(),
            is_guest: true,
            ...userGuestDto
        });

        await this.save(user);
    }

    /**
     * Update a user when he connects into a room
     *
     * @param id
     * @param userUpdate
     * @param room
     */
    public async updateUserForRoom(id: string, userUpdate: ConnectInRoomUserDto, room: Room) {

        const { pseudo } = userUpdate;

        const user = this.create({
            room: room,
            pseudo
        });

        return await this.update(id, user);
    }
}