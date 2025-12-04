import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IaApiGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.header('x-ia-token');
    const expectedToken = process.env.IA_SERVICE_TOKEN;

    console.log('🔐 IA header token =', token);
    console.log('🔐 IA expectedToken =', expectedToken);

    if (!token || !expectedToken || token !== expectedToken) {
      console.warn('❌ IaApiGuard: token inválido');
      throw new UnauthorizedException('IA token inválido');
    }

    // 👉 De momento NO validamos IP para que no bloquee por eso
    return true;
  }
}
