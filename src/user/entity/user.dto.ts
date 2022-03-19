import { uuid } from "uuidv4";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    public slug: string = uuid();

    // @IsNumber()
    // @IsOptional()
    // public readonly room: number;

    @IsNumber()
    @IsOptional()
    public readonly team: number;

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