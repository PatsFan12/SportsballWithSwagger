import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
    /**
     * Update the player's name
     */
    @IsString()
    @IsOptional()
    name: string;

    /**
     * Update the player's goal count
     */
    @IsNumber()
    @IsOptional()
    goalCount: number;
}
