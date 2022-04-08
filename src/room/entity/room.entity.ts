import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import {ModeEnum} from "../enums/mode.enum";
import {AccessEnum, StatusEnum} from "../enums/access.enum";
import {User} from "../../user/entity/user.entity";
import {Game} from "../../game/entity/game.entity";
import {Team} from "../../team/entity/team.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User

    @OneToOne(() => Game)
    @JoinColumn({ name: 'game_id' })
    game: Game

    @OneToMany(() => Team, (team: Team) => team.room)
    teams: Team[]

    @OneToMany(() => User, (user: User) => user.room)
    users: User[]

    @Column()
    slug: string

    @Column({ nullable: true })
    mode: ModeEnum;

    @Column()
    name: string;

    @Column()
    pin: string;

    @Column()
    access: AccessEnum;

    @Column()
    status: StatusEnum;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;
}