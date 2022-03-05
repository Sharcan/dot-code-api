import {EntityRepository, Repository} from "typeorm";
import {Game} from "../entity/game.entity";
import {GameDto} from "../entity/game.dto";

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
    createGame = async (gameDto: GameDto) => {
        return await this.save(gameDto);
    }
}