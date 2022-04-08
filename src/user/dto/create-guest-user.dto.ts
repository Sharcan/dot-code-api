import { uuid } from "uuidv4";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGuestUserDto {
    @IsNotEmpty()
    @IsString()
    public slug: string = uuid();

    @IsString()
    public readonly socket_id: string;
}