export interface UserDto {
    id: string;

    slug: string;

    room_id: number;

    team_id: number;

    socket_id: string;

    pseudo: string;

    email: string;

    password: string;

    is_guest: boolean;
}