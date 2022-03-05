export class UserDto {
    // readonly id: string;

    readonly slug: string;

    readonly room_id: number;

    readonly team_id: number;

    readonly socket_id: string;

    readonly pseudo: string;

    readonly email: string;

    readonly password: string;

    readonly is_guest: boolean;
}