import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLeagueDto {
    
    @ApiProperty({ example: 'Logo La-Liga (hhtps://logo)', description: 'Liga logosi'})
    @IsString()
    readonly league_logo: string;
    
    @ApiProperty({ example: 'La-Liga or Primier Lieague', description: 'Liga nomi'})
    @IsString()
    readonly league_name: string;
}
