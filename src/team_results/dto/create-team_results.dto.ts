import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTeamResultsDto {

    @ApiProperty({ example: '11', description: "O'yinlar soni"})
    @IsNumber()
    readonly match: number;

    @ApiProperty({ example: '7', description: "Jamoa yutgan o'yinlar soni"})
    @IsNumber()
    readonly winner: number;

    @ApiProperty({ example: '2', description: "Jamoa mag'lubiyatlari soni"})
    @IsNumber()
    readonly defeat: number;

    @ApiProperty({ example: '2', description: "Jamoa durrang o'yinlar soni"})
    @IsNumber()
    readonly draw: number;

    @ApiProperty({ example: '18', description: "Jamoa raqib darvozasiga kiritgan to'plar soni"})
    @IsNumber()
    readonly goals: number;

    @ApiProperty({ example: '7', description: "Jamoa o'z darvozasidan o'tkazgan to'plar soni"})
    @IsNumber()
    readonly own_goals: number;

    @ApiProperty({ example: '25', description: "Jamoa turnir davomida to'plagan ochkolari"})
    @IsNumber()
    readonly points: number;
}
