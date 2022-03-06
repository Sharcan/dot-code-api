import { User } from './../../user/entity/user.entity';
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class HistoricGame {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    slug: string;

    @OneToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user: number;

    @Column()
    room_name: string;

    @Column()
    team_name: string;

    @Column()
    result: string;

    @Column({ type: "timestamp" })
    started_at: string;

    @Column({ type: "timestamp" })
    finished_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;
}