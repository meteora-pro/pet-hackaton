import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Useragent = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.useragent;
});
