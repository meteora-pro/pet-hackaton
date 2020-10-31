import { ApiProperty } from '@nestjs/swagger';
import { Token } from '@pet-hackaton/types';

export class TokensDto implements Token {

    @ApiProperty()
    token: string;

    @ApiProperty()
    iat: string;

    @ApiProperty()
    exp: string;
}
