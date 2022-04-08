import { IsNumber } from 'class-validator';
import { uuid } from 'uuidv4';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class TeamDto {
    @IsNotEmpty()
    @IsString()
    public readonly slug: string = uuid();

    public readonly room: string;

    @IsString()
    public readonly name: string;

    @IsNumber()
    public readonly points: number;
}