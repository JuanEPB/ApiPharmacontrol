import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Devuelve el objeto user completo (req.user)
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Devuelve solo el userId (req.user.userId)
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.userId;
  },
);
