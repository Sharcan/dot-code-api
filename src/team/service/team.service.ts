import { Team } from './../entity/team.entity';
import { Room } from '../../room/entity/room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly _teamRepository: Repository<Team>
    ) {}
}
