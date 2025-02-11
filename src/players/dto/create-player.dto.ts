import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlayerDto {
    /**
     * The name of the player
     */
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Lionel Messi',
        description: 'The name of the player'
    })
    name: string;

    /**
     * The total number of goals the player has scored in his/her career
     */
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: '65',
        description: 'The total number of goals the player has scored in his/her career'
    })
    goalCount: number;

    /**
     * The birth date of the player
     */
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '2000-01-23',
        description: 'The birth date of the player'
    })
    birthDate: string;
}
