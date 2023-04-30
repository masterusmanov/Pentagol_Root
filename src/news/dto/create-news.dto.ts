import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {
    @ApiProperty({ example: "https://media", description: "Video yoki rasmm" })
    @IsString()
    @IsNotEmpty()
    readonly media: string;

    @ApiProperty({ example: "title", description: "Title" })
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({ example: "description", description: "Description" })
    @IsString()
    @IsNotEmpty()
    readonly description: string;
}
