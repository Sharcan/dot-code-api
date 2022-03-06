import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {GameTypeEnum} from "../enum/game-type.enum";
import {AccessEnum} from "../../room/enums/access.enum";
import {LanguageEnum} from "../enum/language.enum";
import {User} from "../../user/entity/user.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @OneToOne(type => User)
    @JoinColumn({ name: 'creator_id' })
    creator: number;

    @Column()
    name: string;

    @Column()
    type: GameTypeEnum;

    @Column()
    total_to_win: number;

    @Column()
    access: AccessEnum;

    @Column()
    language: LanguageEnum;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;
}