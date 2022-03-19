export class HistoricGameDto {
    readonly slug: string;
    readonly user: number;
    readonly room_name: string;
    readonly team_name: string;
    readonly result: string;
    readonly started_at: string;
    readonly finished_at: string;
}