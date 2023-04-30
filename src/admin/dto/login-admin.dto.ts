import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";


export class LoginAdminDto{

    @ApiProperty({ example: 'customer@email.uz', description: 'Admin emaili'})
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'P@$$w00rd', description: 'Admin paroli'})
    @IsString()
    password: string;


}