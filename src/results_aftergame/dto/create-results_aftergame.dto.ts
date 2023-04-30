import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateResultsAftergameDto {
    
    @ApiProperty({ example: '1 or 3', description: "O'yinda urilgan gollar"})
    @IsNumber()
    readonly goals_scored: number;
}
