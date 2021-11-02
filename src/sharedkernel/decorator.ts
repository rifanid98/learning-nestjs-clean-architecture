import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'domain/entity/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const http = ctx.switchToHttp();
    const req = http.getRequest();
    return req.user;
  },
);
