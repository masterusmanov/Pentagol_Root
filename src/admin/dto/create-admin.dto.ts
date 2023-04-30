import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ example: 'first_name', description: 'Admin ismi'})
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @ApiProperty({ example: 'last_name', description: 'Admin familiyasi'})
    @IsNotEmpty()
    @IsString()
    readonly last_name: string;

    @ApiProperty({ example: 'AdminName', description: 'Admin logini (Nick)'})
    @IsNotEmpty()
    @IsString()
    readonly admin_name: string;

    @ApiProperty({ example: 'customer@email.uz', description: 'Admin emaili'})
    @IsEmail()
    readonly email: string;
    
    @ApiProperty({ example: 'P@$$w00rd', description: 'Admin paroli'})
    @IsStrongPassword()
    @MinLength(8)
    readonly password: string;

    @ApiProperty({ example: 'P@$$w00rd', description: 'Takroriy admin paroli'})
    @IsStrongPassword()
    @MinLength(8)
    readonly confirmPassword: string;
}
