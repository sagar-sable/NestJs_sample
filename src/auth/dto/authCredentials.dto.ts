import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    { message: 'Password is Weak use One uppar, case One lower case and One special charactor or number' })
    password: string;
}