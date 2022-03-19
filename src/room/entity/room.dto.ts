import { uuid } from 'uuidv4';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import {ModeEnum} from "../enums/mode.enum";
import {AccessEnum, StatusEnum} from "../enums/access.enum";

export class RoomDto {
    @IsNotEmpty()
    @IsString()
    public slug: string = uuid();

    @IsOptional()
    public owner;

    @IsOptional()
    public game: number;

    @IsString()
    @IsOptional()
    public mode: ModeEnum;

    @IsString()
    public name: string;

    @IsString()
    public pin: string;

    @IsString()
    @IsEnum(AccessEnum)
    public access: AccessEnum = AccessEnum.PRIVATE;

    @IsString()
    @IsEnum(StatusEnum)
    public status: StatusEnum = StatusEnum.ON;
}