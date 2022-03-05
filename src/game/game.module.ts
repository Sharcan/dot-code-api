import {Module} from '@nestjs/common';
import {GameController} from './controller/game.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "./entity/game.entity";
import {GameRepository} from "./repository/game.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Game, GameRepository])],
  exports: [TypeOrmModule],
  controllers: [GameController]
})
export class GameModule {}
