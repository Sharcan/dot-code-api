import { UserService } from './../../user/service/user.service';
import { CreateRoomDto } from './../dto/create-room.dto';
import { RoomService } from '../service/room.service';
import { Controller, Post, UsePipes, ValidationPipe, Body, Param, Get, Query, Delete } from '@nestjs/common';
import { UserModel } from 'src/gateways/models/user.model';
import { RoomClass } from 'src/room/classes/room';
import { TeamEnum } from '../enums/team.enum';
import { Room } from '../entity/room.entity';

@Controller('room')
export class RoomController {

    constructor(
        private readonly _roomService: RoomService,
        private readonly _userService: UserService
    ) {}

    @Get(':id')
    public getRoomById(@Param('id') id: number): Promise<Room> {
        return this._roomService.getRoomById(id);
    }

    @Get('/pin/:pin')
    public getRoomByPin(@Query('pin') pin: string): Promise<Room> {
        return this._roomService.getRoomByPin(pin);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
        // Create room
        const room = await this._roomService.createRoom(createRoomDto);

        // Update user room
        this._userService.updateUserRoom(room.owner.id, room);
        
        return room;
    }

    @Delete('/:id')
    deleteRoom(@Param('id') id: number): Promise<void> {
        return this._roomService.deleteRoom(id);
    }

    // OLD

    /** L'ensemble des rooms créées */
    public rooms: RoomClass[] = [new RoomClass('123')];

    /**
     * Création à une room
     * 
     * @returns json
     */
    public createRoom2(socketId: string) 
    {

        let roomExist: boolean = false;
        let newPin: string;

        do {
            // on génère un nouveau PIN
            newPin = this.__getNewPin();

            // on check si le pin existe déjà
            this.rooms.forEach((key: RoomClass) => {
                roomExist = this._checkIfRoomExist(newPin, key.pin)
            });

        } while (roomExist);

        // Création d'une nouvelle Room
        const room = new RoomClass(newPin);
        this.rooms.push(room);
        
        // Store user if not already in
        if(!room.connectedUsers.find(user => user.socketId == socketId)) {
            room.connectUser({ socketId })
        }

        return { message: 'Room créée', pin: room.pin }
    }

    /**
     * Connexion à une room
     * 
     * @param pin 
     * @returns json
     */
    public connectToRoom(pin: string, socketId: string) 
    {
        const room = this._searchRoom(pin);
        
        // Check room exists
        if (!room) {
            return  { error: 'Room non trouvé' };
        }

        // Store user if not already in
        if(!room.connectedUsers.find(user => user.socketId == socketId)) {
            room.connectUser({ socketId })
        }

        return { message: 'Room trouvée', pin: room.pin };
    }

    /**
     * Set username of user in room
     * 
     * @param socketId 
     * @param pin 
     * @param username 
     * @returns json
     */
    public setUsername(socketId: string, pin: string, username: string) 
    {
        if(!username) {
            return { error: `Merci d'entrer un pseudo` }
        }

        const room = this._searchRoom(pin);
        if (!room) {
            return  { error: 'Room non trouvée' };
        }

        room.setUsername(socketId, username);

        return {
            message: `Le pseudo de l'utilisateur a bien été mis à jour`, 
            pin: pin, 
            socketId: socketId, 
            username: username
        }
    }

    public getConnectedUsers(pin: string, socketId: string)
    {
        const room = this._searchRoom(pin);
        if (!room) {
            return  { error: 'Room non trouvée' };
        }
        const user: UserModel = room.getConnectedUser(socketId);

        return {room: room, user: user};
    }

    /**
     * Rejoindre une team
     * 
     * @param socketId 
     * @param pin 
     * @param username 
     * @param team 
     * @returns 
     */
    public joinTeam(socketId: string, pin: string, team: string) 
    {
        // Check team exists
        if(!Object.values(TeamEnum)?.includes(team as TeamEnum)) {
            return  { error: `Cette équipe n'existe pas` };
        }

        // Get room
        const room = this._searchRoom(pin);
        if (!room) {
            return  { error: 'Room non trouvée' };
        }

        // Get user
        const user = room.getConnectedUser(socketId);
        if (!user) {
            return  { error: 'User non trouvé' };
        }

        // Check team is empty (1v1 only)
        if((team == TeamEnum.TEAM_1 && room.team_1.length) || (team == TeamEnum.TEAM_2 && room.team_2.length)) {
            return { error: `Cette équipe est déjà pleine` }
        }

        // Check if not already in team
        if((team == TeamEnum.TEAM_1 && room.team_1.find(member => member.socketId == user.socketId)) || (team == TeamEnum.TEAM_2 && room.team_2.find(member => member.socketId == user.socketId))) {
            return { error: `L'utilisateur fait déjà partie de cette équipe` }
        }
        
        // Add user to team
        room.addUserToTeam(user, team);

        return {message: `L'utilisateur a bien été ajouté à la team`, user: user};
    }

    /**
     * Quitter une team
     */
    public leaveTeam(pin: string, socketId: string, username: string) 
    {
        // Get room
        const room = this._searchRoom(pin);
        if (!room) {
            return  { error: 'Room non trouvé' };
        }

        return room.removeUserFromUnknownTeam({socketId: socketId, username: username});
    }

    /**
     * Launch the game
     * 
     * @param pin 
     */
    public launchGame(pin: string)
    {
        // Get room
        const room = this._searchRoom(pin);
        if (!room) {
            return  { error: 'Room non trouvé' };
        }

        // Check teams not empty
        if(!room.team_1.length || !room.team_2.length) {
            return { error: `Les équipes ne sont pas pleines` }
        }

        return { message: `La partie peut se lancer` }
    }

    /**
     * 
     * @param pin 
     * @param user 
     */
    public nextExercice(pin: string, socketId: string)
    {
        // Get room
        const room = this._searchRoom(pin);
        if (!room) {
            return  { error: 'Room non trouvée' };
        }

        // Get user
        const user = room.getConnectedUser(socketId);
        if (!user) {
            return  { error: 'User non trouvé' };
        }

        return { user: user };
    }

    /**
     * Rechercher si une room existe
     * 
     * @param pin 
     * @returns 
     */
    public _searchRoom(pin: string): RoomClass | undefined 
    {
       return this.rooms.find((roomToFind: RoomClass) => roomToFind.pin === pin);
    }

    /**
     * Checker si la room existe déjà
     * 
     * @param newRoomPin 
     * @param pin 
     * @returns 
     */
    private _checkIfRoomExist(newRoomPin: string, pin: string) 
    {
       return newRoomPin === pin;
    }

    /**
     * Génération d'un nouveau PIN
     * 
     * @returns string
     */
    private __getNewPin() 
    {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let newPin = "";
    
        while(newPin.length < 4) {
    
          const isNoL = this.__getRandomInt(2);
    
          newPin += isNoL === 0 ? alphabet.charAt(this.__getRandomInt(alphabet.length)) : this.__getRandomInt(10);
        
        }
    
        return newPin;
    }

    /**
     * Renvoie un nombre aléatoire
     * 
     * @param max 
     * @returns number
     */
    private __getRandomInt(max: number) 
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
