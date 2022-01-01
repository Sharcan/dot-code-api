import { UserModel } from "../../gateways/models/user.model";
import { TeamEnum } from "../enums/team.enum";

export class Room {

    /**
     * Variables
     */
    public connectedUsers: UserModel[] = [];
    public team_1: UserModel[] = [];
    public team_2: UserModel[] = [];
    
    public constructor(
        public pin: string
    ) {
    }

    /**
     * Connect a user to the room
     * 
     * @param user
     */
    public connectUser(user: UserModel) {
        this.connectedUsers.push(user);
    }

    /**
     * Get a connected user with his socket
     * 
     * @param socketId 
     * @returns 
     */
    public getConnectedUser(socketId: string) {
        return this.connectedUsers.find(user => user.socketId == socketId);
    }

    /**
     * Set username of a connected user
     * 
     * @param socketId 
     * @param username 
     */
    public setUsername(socketId: string, username: string) {
        const user = this.getConnectedUser(socketId);

        if(user) {
            user.username = username;
        }
    }

    /**
     * Add user in team
     * 
     * @param user 
     * @param team 
     */
    public addUserToTeam(user: UserModel, team: string) {
        // Remove user from latest team
        this.removeUserFromUnknownTeam(user);
        // Add to new team
        team === TeamEnum.TEAM_1 ? this.team_1.push(user) : this.team_2.push(user);
    }

    /**
     * Retirer un utilisateur d'une équipe inconnue
     * 
     * @param user 
     * @returns 
     */
    public removeUserFromUnknownTeam(user: UserModel) {
        let userIndex: number;

        userIndex = this.team_1.findIndex((userToFind: UserModel) => userToFind.socketId === user.socketId);
        if (userIndex !== -1) {
            this.team_1.splice(userIndex, 1);
            return {message: `Utilisateur retiré de l'équipe 1`, pin: this.pin};
        }

        userIndex = this.team_2.findIndex((userToFind: UserModel) => userToFind.socketId === user.socketId);
        if (userIndex !== -1) {
            this.team_2.splice(userIndex, 1);
            return {message: `Utilisateur retiré de l'équipe 2`, pin: this.pin};
        }

        return {error: 'Utilisateur non trouvé dans cette room'};
    }


    /**
     * Retirer un utilisateur d'une équipe
     * 
     * @param user 
     * @param team 
     */
    public removeUserFromTeam(user: UserModel, team: TeamEnum) {
        if (user && team) {
            // on récupère la team
            const teamToRemove = team === TeamEnum.TEAM_1 ? this.team_1 : this.team_2;
            const index = teamToRemove.findIndex((userToFind: UserModel) => userToFind === user)
            
            if (index !== -1) {
                teamToRemove.splice(index, 1);
            }
        }
    }
}
