import { uuid } from "uuidv4";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    public readonly slug: string = uuid();

    @IsString()
    @IsOptional()
    public readonly pseudo: string;

    @IsEmail()
    @IsOptional()
    public readonly email: string;

    @IsString()
    @IsOptional()
    public password: string;

    @IsBoolean()
    public readonly is_guest: boolean;

    public readonly room_id: number;
    public readonly team_id: number;
    public readonly socket_id: string;
}