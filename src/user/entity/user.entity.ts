import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import {Room} from "../../room/entity/room.entity";
import {Team} from "../../teams/entity/teams.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @OneToOne(type => Room) @JoinColumn({})
    room: number

    @OneToOne(type => Team) @JoinColumn()
    team: number

    @Column()
    socket_id: string;

    @Column()
    pseudo: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    is_guest: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;
}