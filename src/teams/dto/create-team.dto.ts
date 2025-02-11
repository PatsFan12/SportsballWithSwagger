import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
    /**
     * country is the team from
     */
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
            example: 'Hungary'
        })
    country: string;
}
