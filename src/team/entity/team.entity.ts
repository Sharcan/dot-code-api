import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Room} from "../../room/entity/room.entity";
import {User} from "../../user/entity/user.entity";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    slug: string;

    @ManyToOne(() => Room, (room: Room) => room.team)
    @JoinColumn({ name: 'room_id' })
    room: string;

    @OneToMany(() => User, (user: User) => user.team)
    user: number;

    @Column()
    name: string;

    @Column()
    points: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;
}