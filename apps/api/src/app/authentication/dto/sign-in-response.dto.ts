import {TokensDto} from "./tokens.dto";
import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '@pet-hackaton/types';

export class SignInResponseDto implements Tokens{

    @ApiProperty()
    accessToken: TokensDto;

    @ApiProperty()
    refreshToken: TokensDto;

}
