import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Room} from "../../room/entity/room.entity";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    slug: string;

    @OneToOne(type => Room) @JoinColumn()
    room: string;

    @Column()
    name: string;

    @Column()
    points: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;
}