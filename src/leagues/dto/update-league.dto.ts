import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateLeagueDto {
    
    @ApiProperty({ example: 'Logo La-Liga (hhtps://logo)', description: 'Liga logosini yangilash'})
    @IsString()
    league_logo?: string;
    
    @ApiProperty({ example: 'La-Liga => Primier Lieague', description: 'Liga nomini yangilash'})
    @IsString()
    league_name?: string;
}
