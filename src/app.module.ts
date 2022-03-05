import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventGateway } from './gateways/event.gateway';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user/service/user.service";

@Module({
  imports: [
    RoomModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres-db',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'doteCode',
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
    })
  ],
  controllers: [AppController],
  providers: [AppService, EventGateway, UserService],
})
export class AppModule {}
