import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

const fromCookie = (req: any) => req?.cookies?.at || null; // SOLO si un día decides poner access en cookie 'at'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // fromCookie, // descomenta si usaras cookie 'at' para access
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'secret',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, correo: payload.correo };
  }
}
