import { UserModel } from "../../gateways/models/user.model";
import { TeamEnum } from "../enums/team.enum";

export class Room {

    /**
     * Variables
     */
    public equipe_1: UserModel[] = [];
    public equipe_2: UserModel[] = [];
    
    public constructor(
        public pin: string
    ) {
    }

    /**
     * Ajouter un utilisateur dans une équipe
     * 
     * @param user 
     * @param team 
     */
    public addNewUser(user: UserModel, team: string) {
        if (user && team) {
            team === TeamEnum.TEAM_1 ? this.equipe_1.push(user)
                : this.equipe_2.push(user);
        }
    }

    /**
     * Retirer un utilisateur d'une équipe inconnue
     * 
     * @param user 
     * @returns 
     */
    public removeUserFromUnknownTeam(user: UserModel) {
        let userIndex: number;

        userIndex = this.equipe_1.findIndex((userToFind: UserModel) => userToFind.socketId === user.socketId);
        if (userIndex !== -1) {
            this.equipe_1.splice(userIndex, 1);
            return {message: `Utilisateur retiré de l'équipe 1`, pin: this.pin};
        }

        userIndex = this.equipe_2.findIndex((userToFind: UserModel) => userToFind.socketId === user.socketId);
        if (userIndex !== -1) {
            this.equipe_2.splice(userIndex, 1);
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
            const teamToRemove = team === TeamEnum.TEAM_1 ? this.equipe_1 : this.equipe_2;
            const index = teamToRemove.findIndex((userToFind: UserModel) => userToFind === user)
            
            if (index !== -1) {
                teamToRemove.splice(index, 1);
            }
        }
    }
}
