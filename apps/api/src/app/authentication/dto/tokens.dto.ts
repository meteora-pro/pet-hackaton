import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {

    @ApiProperty()
    token: string;

    @ApiProperty()
    iat: string;

    @ApiProperty()
    exp: string;
}
