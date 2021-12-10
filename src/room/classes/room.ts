import { UserModel } from "../../gateways/models/user.model";
import { TeamEnum } from "../enums/team.enum";

export class Room {

    /**
     * Variables
     */
    public equipe_1: UserModel[];
    public equipe_2: UserModel[];
    

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
    public addNewUser(user: UserModel, team: TeamEnum) {
        if (user && team) {
            team === TeamEnum.TEAM_1 ? this.equipe_1.push(user)
                : this.equipe_2.push(user);
        }
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
