import { uuid } from "uuidv4";
import {IsBoolean, IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UserDto {
    @IsNotEmpty()
    public readonly slug: string = uuid();

    @IsString()
    public readonly pseudo: string;

    @IsEmail()
    @IsNotEmpty()
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    @IsBoolean()
    public readonly is_guest: boolean;

    public readonly room_id: number;
    public readonly team_id: number;
    public readonly socket_id: string;
}