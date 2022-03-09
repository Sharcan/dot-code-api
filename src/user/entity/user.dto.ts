import { uuid } from "uuidv4";

export class UserDto {
    readonly slug: string = uuid();
    readonly room_id: number;
    readonly team_id: number;
    readonly socket_id: string;
    readonly pseudo: string;
    readonly email: string;
    readonly password: string;
    readonly is_guest: boolean;
}