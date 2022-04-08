import { RoomRepository } from './../room/repository/room.repository';
import { RoomModule } from './../room/room.module';
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {UserService} from "./service/user.service";
import {UserController} from "./controller/user.controller";
import {UserRepository} from "./repository/user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository]), RoomModule],
    exports: [TypeOrmModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
