import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import {Room} from "../../room/entity/room.entity";
import {Team} from "../../team/entity/team.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @OneToOne(type => Room)
    @JoinColumn({ name: 'room_id' })
    room: number;

    @OneToOne(type => Team)
    @JoinColumn({ name: 'team_id' })
    team: number;

    @Column()
    socket_id: string;

    @Column({ nullable: true })
    pseudo: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ default: true })
    is_guest: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: string;
}