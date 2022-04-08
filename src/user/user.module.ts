import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";
import { UserRepository } from "./repository/user.repository";
import { RoomModule } from "../room/room.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),
        forwardRef(() => RoomModule)
    ],
    exports: [
        TypeOrmModule,
        UserService
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
