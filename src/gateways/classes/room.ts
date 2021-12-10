import { UserModel } from "../models/user.model";

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

    public test() {
        console.log(this.pin);
    }
}
