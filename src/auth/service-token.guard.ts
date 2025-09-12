// service-token.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ServiceTokenGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const xsrv = req.headers['x-service-token'] as string;
    const token = auth || xsrv || '';
    if (token !== process.env.SERVICE_API_TOKEN) {
      throw new UnauthorizedException('Bad service token');
    }
    return true;
  }
}
