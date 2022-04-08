import { IsOptional, IsString } from 'class-validator';

export class getRoomsFilterDto {

    @IsOptional()
    @IsString()
    pin?: string;

}