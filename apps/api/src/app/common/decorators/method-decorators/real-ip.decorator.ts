import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RealIp = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return  request.headers['x-real-ip'] || '0.0.0.0';
});
