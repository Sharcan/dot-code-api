import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {ModeEnum} from "../enums/mode.enum";
import {AccessEnum, StatusEnum} from "../enums/access.enum";
import {Users} from "../../user/entity/user.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(type => Users) @JoinColumn()
    owner_id: number

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

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}