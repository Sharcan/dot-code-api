import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Room} from "../../room/entity/room.entity";
import {User} from "../../user/entity/user.entity";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @ManyToOne(() => Room, (room: Room) => room.teams)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @OneToMany(() => User, (user: User) => user.team)
    users: User[];

    @Column()
    name: string;

    @Column()
    points: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;
}