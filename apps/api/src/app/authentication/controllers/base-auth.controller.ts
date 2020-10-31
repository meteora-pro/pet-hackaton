import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { SignInRequestDto } from '../dto/sign-in-request.dto';
import { SignInResponseDto } from '../dto/sign-in-response.dto';
import { SignUpRequestDto } from '../dto/sign-up-request.dto';
import { LocalSignService } from '../services/local-sign.service';
import { RefreshTokenRequestDto } from '../dto/refresh-token-request.dto';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { User } from '../../common/decorators/method-decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class BaseAuthController {
    constructor(private localSignService: LocalSignService) {}

    @Post('sign-in')
    public signIn(
        @Body() signInBodyDto: SignInRequestDto,
    ): Promise<SignInResponseDto> {
        return this.localSignService.signIn(signInBodyDto);
    }

    @Post('sign-up')
    public signUp(
        @Body() signUpBodyDto: SignUpRequestDto,
    ): Promise<SignInResponseDto> {
        return this.localSignService.signUp(signUpBodyDto);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh-token')
    public refreshToken(
        @Body() refreshTokenDto: RefreshTokenRequestDto,
        @User() user: UserEntity,
    ): Promise<SignInResponseDto> {
        return this.localSignService.refreshToken(refreshTokenDto, user);
    }
}
