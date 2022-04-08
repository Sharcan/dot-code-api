import { Room } from '../../room/entity/room.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from "../../team/entity/team.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @ManyToOne(() => Room, (room: Room) => room.users)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @ManyToOne(() => Team, (team: Team) => team.users)
    @JoinColumn({ name: 'team_id' })
    team: Team;

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