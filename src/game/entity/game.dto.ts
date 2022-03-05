import {GameTypeEnum} from "../enum/game-type.enum";
import {AccessEnum} from "../../room/enums/access.enum";
import {LanguageEnum} from "../enum/language.enum";

export class GameDto {
    readonly slug: string;
    readonly creator_id: number;
    readonly name: string;
    readonly type: GameTypeEnum;
    readonly total_to_win: number;
    readonly access: AccessEnum;
    readonly language: LanguageEnum;
}