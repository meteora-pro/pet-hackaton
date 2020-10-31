import {IsString, MinLength, Validate} from 'class-validator';
import {UserNotFoundValidator} from "../validators/user-not-found-validator.service";
import {ApiProperty} from "@nestjs/swagger";

export class SignInRequestDto {

    @ApiProperty({description: 'Login or email'})
    @Validate(UserNotFoundValidator)
    login: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    password: string;
}
