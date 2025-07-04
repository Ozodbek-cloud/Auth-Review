import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    surname: string


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    confirm_password: string

    @IsString()
    @IsNotEmpty()
    address: string
}

export class LoginDto{

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}