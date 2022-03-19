import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {Team} from "../../team/entity/team.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @ManyToOne(() => Team, (team: Team) => team.user)
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