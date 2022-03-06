import {EntityRepository, Repository} from "typeorm";
import {Team} from "../entity/team.entity";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
}