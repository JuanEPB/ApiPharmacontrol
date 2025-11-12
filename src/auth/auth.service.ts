// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthUser } from './auth.types';

const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // demo: guarda RT en memoria (en prod => DB)
  private refreshStore = new Map<number, string>();

  async validateUser(email: string, contraseña: string): Promise<AuthUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const ok = await bcrypt.compare(contraseña, user.contraseña);
    if (!ok) return null;

    // devolvemos sólo lo necesario
    return { id: user.id, email: user.email, rol: user.rol };
  }

  private signAccess(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: ACCESS_EXPIRES_IN,
    });
  }

  private signRefresh(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: REFRESH_EXPIRES_IN,
    });
  }

  async issueTokens(user: AuthUser) {
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email, rol: user.rol };
    const accessToken = this.signAccess(payload);
    const refreshToken = this.signRefresh({ sub: user.id });

    this.refreshStore.set(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async refreshWithToken(refreshToken: string) {
    let decoded: any;
    try {
      decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    } catch {
      throw new UnauthorizedException('Refresh inválido o expirado');
    }

    const last = this.refreshStore.get(decoded.sub);
    if (!last || last !== refreshToken) {
      throw new UnauthorizedException('Refresh no reconocido');
    }

    const user = await this.usersService.findById(decoded.sub);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const payload = { sub: user.id, email: user.email, rol: user.rol };
    const accessToken = this.signAccess(payload);

    // Rotación de refresh (opcional pero recomendable)
    const newRT = this.signRefresh({ sub: user.id });
    this.refreshStore.set(user.id, newRT);

    return { accessToken, refreshToken: newRT };
  }
}
