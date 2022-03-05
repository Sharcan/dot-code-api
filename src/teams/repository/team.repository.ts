import {EntityRepository, Repository} from "typeorm";
import {Team} from "../entity/teams.entity";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
}