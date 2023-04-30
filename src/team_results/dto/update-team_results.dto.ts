import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateTeamResultsDto {
    
    @ApiProperty({ example: '11', description: "O'yinlar soni"})
    @IsNumber()
    match?: number;

    @ApiProperty({ example: '7', description: "Jamoa yutgan o'yinlar soni"})
    @IsNumber()
    winner?: number;

    @ApiProperty({ example: '2', description: "Jamoa mag'lubiyatlari soni"})
    @IsNumber()
    defeat?: number;

    @ApiProperty({ example: '2', description: "Jamoa durrang o'yinlar soni"})
    @IsNumber()
    draw?: number;

    @ApiProperty({ example: '18', description: "Jamoa raqib darvozasiga kiritgan to'plar soni"})
    @IsNumber()
    goals?: number;

    @ApiProperty({ example: '7', description: "Jamoa o'z darvozasidan o'tkazgan to'plar soni"})
    @IsNumber()
    own_goals?: number;

    @ApiProperty({ example: '25', description: "Jamoa turnir davomida to'plagan ochkolari"})
    @IsNumber()
    points?: number;
}
