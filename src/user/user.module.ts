import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./Entity/user.entity";
import {UserService} from "./Service/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService]
})
export class UserModule {}
