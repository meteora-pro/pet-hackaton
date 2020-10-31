import {TokensDto} from "./tokens.dto";
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {

    @ApiProperty()
    accessToken: TokensDto;

    @ApiProperty()
    refreshToken: TokensDto;

}
