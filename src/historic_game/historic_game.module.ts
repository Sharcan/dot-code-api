import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HistoricGame} from "./entity/historic_game.entity";
import {HistoricGameRepository} from "./repository/historic_game.repository";

@Module({
    imports: [TypeOrmModule.forFeature([HistoricGame, HistoricGameRepository])],
    exports: [TypeOrmModule]
})
export class HistoricGameModule {}
