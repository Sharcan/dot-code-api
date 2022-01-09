import { TeamEnum } from "src/room/enums/team.enum";

export interface UserModel {
    socketId: string;
    username?: string;
    team?: string;
}