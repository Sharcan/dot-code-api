import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import {Room} from "../../room/entity/room.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    // TODO: Ajouter les relations
    // @OneToOne(type => Room) @JoinColumn()
    room: number

    // @OneToOne()
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

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}