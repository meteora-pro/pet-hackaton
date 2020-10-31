import {TokensDto} from "./tokens.dto";
import { PermissionsEnum } from '../constants/permissions.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {

    @ApiProperty()
    accessToken: TokensDto;

    @ApiProperty()
    refreshToken: TokensDto;

    @ApiProperty()
    permissions?: PermissionsEnum[];
}
