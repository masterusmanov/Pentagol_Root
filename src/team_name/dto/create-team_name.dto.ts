import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTeamNameDto {
    
    @ApiProperty({ example: 'Real-Madrid (hhtps://logo)', description: 'Jamoa logosi'})
    @IsString()
    readonly team_logo: string;
    
    @ApiProperty({ example: 'La-Liga or Primier Lieague', description: 'Liga nomi'})
    @IsString()
    readonly team_name: string;

    @ApiProperty({ example: '30-04-2023', description: "O'yin vaqtlari"})
    @IsString()
    readonly game_date: string;
}
