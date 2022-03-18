import { Delete, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Team } from '../entity/team.entity';
import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import { TeamDto } from "../entity/team.dto";
import { TeamRepository } from "../repository/team.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('team')
export class TeamController {

    constructor(
        @InjectRepository(TeamRepository) 
        private readonly _teamRepository: TeamRepository
    ) {
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Team> {
        return this._teamRepository.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() userDto: TeamDto) {
        return this._teamRepository.save(userDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userDto: TeamDto) {
      return this._teamRepository.update(id, userDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this._teamRepository.delete(id);
    }
}
