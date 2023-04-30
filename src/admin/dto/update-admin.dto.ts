import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword, MinLength } from "class-validator";

export class UpdateAdminDto {
    
    @ApiProperty({ example: 'userName', description: 'Admin login (Nick)ini yangilash'})
    @IsString()
    admin_name?: string;

    @ApiProperty({ example: 'P@$$w00rd', description: 'Admin parolini yangilash'})
    @IsStrongPassword()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: 'P@$$w00rd', description: 'Takroriy admin paroli'})
    @IsStrongPassword()
    @MinLength(8)
    confirmPassword: string;
}
