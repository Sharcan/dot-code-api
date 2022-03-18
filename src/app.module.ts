import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventGateway } from './gateways/event.gateway';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { GameModule } from './game/game.module';
import { TeamsModule } from './team/teams.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
      migrationsRun: false,
      logging: true,
      migrationsTableName: "migration",
      migrations: [__dirname + '/migration/**/*.ts', __dirname + '/migration/**/*.js'],
      synchronize: false,
      cli: {
        migrationsDir: 'src/migration'
      },
      autoLoadEntities: true,
    }),

    RoomModule,
    UserModule,
    GameModule,
    TeamsModule
  ],
  controllers: [AppController],
  providers: [AppService, EventGateway],
})
export class AppModule {}
