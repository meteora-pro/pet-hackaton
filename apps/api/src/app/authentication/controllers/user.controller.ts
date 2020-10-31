import { Controller, UseGuards, Get } from '@nestjs/common';
import { User } from '../../common/decorators/method-decorators/user.decorator';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDataResponseDto } from '../dto/user-data-response.dto';
import { UserService } from '../services/user.service';
import { UserEntity } from '../../entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @Get('me')
    public getUserData(@User() user: UserEntity): Promise<UserDataResponseDto> {
        return this.userService.getUserData(user.id);
    }
}
