import {ModeEnum} from "../enums/mode.enum";
import {AccessEnum, StatusEnum} from "../enums/access.enum";

export class RoomDto {
    readonly slug: string;
    readonly owner_id: number;
    readonly game_id: number;
    readonly mode: ModeEnum;
    readonly name: string;
    readonly code: string;
    readonly access: AccessEnum;
    readonly status: StatusEnum;
}