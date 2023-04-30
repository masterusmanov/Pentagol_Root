import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateTeamNameDto {
    
    @ApiProperty({ example: 'Real-Madrid (hhtps://logo)', description: 'Jamoa logosini yangilash'})
    @IsString()
    team_logo?: string;
    
    @ApiProperty({ example: 'La-Liga or Primier Lieague', description: 'Liga nomini yangilash'})
    @IsString()
    team_name?: string;

    @ApiProperty({ example: '30-04-2023', description: "O'yin vaqtlarini o'zgartirish"})
    @IsString()
    game_date?: string;
}
