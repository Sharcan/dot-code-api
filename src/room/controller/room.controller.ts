import { Controller } from '@nestjs/common';
import { Room } from 'src/room/classes/room';
import { TeamEnum } from '../enums/team.enum';
@Controller('room')
export class RoomController {

    /** L'ensemble des rooms créées */
    public rooms: Room[] = [];

    /**
     * Création à une room
     * 
     * @returns json
     */
    public createRoom() {

        let roomExist: boolean = false;
        let newPin: string;

        do {
            // on génère un nouveau PIN
            newPin = this.__getNewPin();

            // on check si le pin existe déjà
            this.rooms.forEach((key: Room) => {
                roomExist = this._checkIfRoomExist(newPin, key.pin)
            });

        } while (roomExist);

        // Création d'une nouvelle Room
        const room = new Room(newPin);
        this.rooms.push(room);
        
        // TODO : Envoyer socket de création de room et d'ajout de l'utilisateur dans la room
        // TODO : Retourner json comme quoi j'ai créé une room
        return { message: 'Room créée', pin: room.pin }
    }

    /**
     * Connexion à une room
     * 
     * @param pin 
     * @returns json
     */
    public connectToRoom(pin: string, socketId: string) {

        const room = this._searchRoom(pin);
        
        if (!room) {
            return  { error: 'Room non trouvé' };
        }

        return { message: 'Room trouvée', pin: room.pin};
    }


    public joinTeam(socketId: string, pin: string, username: string, team: string) {
        const room = this._searchRoom(pin);

        if (!room) {
            return  { error: 'Room non trouvé' };
        }

        room.addNewUser({socketId, username}, team)

        console.log(room);
    }


    /**
     * Rechercher si une room existe
     * 
     * @param pin 
     * @returns 
     */
    private _searchRoom(pin: string): Room | null {
        let roomExist: Room;

        this.rooms.forEach((room: Room, index: number) => {
            roomExist = this._checkIfRoomExist(pin, room.pin) ? this.rooms[index] 
                : null;
        });

        return roomExist;
    }

    /**
     * Checker si la room existe déjà
     * 
     * @param newRoomPin 
     * @param pin 
     * @returns 
     */
    private _checkIfRoomExist(newRoomPin: string, pin: string) {
       return newRoomPin === pin;
    }

    /**
     * Génération d'un nouveau PIN
     * 
     * @returns string
     */
    private __getNewPin() {

        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let newPin = "";
    
        while(newPin.length < 4) {
    
          const isNoL = this.__getRandomInt(2);
    
          newPin += isNoL === 0 ? alphabet.charAt(this.__getRandomInt(alphabet.length)) 
            : this.__getRandomInt(10);
        
        }
    
        return newPin;
    }

    /**
     * Renvoie un nombre aléatoire
     * 
     * @param max 
     * @returns number
     */
    private __getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
