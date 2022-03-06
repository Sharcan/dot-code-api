import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {ModeEnum} from "../enums/mode.enum";
import {AccessEnum, StatusEnum} from "../enums/access.enum";
import {User} from "../../user/entity/user.entity";
import {Game} from "../../game/entity/game.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(type => User)
    @JoinColumn({ name: 'owner_id' })
    owner: number

    @OneToOne(type => Game)
    @JoinColumn({ name: 'game_id' })
    game: number

    @Column()
    slug: string

    @Column()
    mode: ModeEnum;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    access: AccessEnum;

    @Column()
    status: StatusEnum;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;
}