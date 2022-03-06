import {EntityRepository, Repository} from "typeorm";
import {HistoricGame} from "../entity/historic_game.entity";

@EntityRepository(HistoricGame)
export class HistoricGameRepository extends Repository<HistoricGame> {
}