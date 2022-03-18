import { uuid } from "uuidv4";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    public readonly slug: string = uuid();

    @IsNumber()
    @IsOptional()
    public readonly room_id: number;

    @IsNumber()
    @IsOptional()
    public readonly team_id: number;

    @IsString()
    @IsOptional()
    public readonly socket_id: string;

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
}