import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // NO cambiar nombres: email y password
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuariosService.findByEmail(email);
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;

    const { password: _omit, ...safeUser } = user;
    return safeUser; // user sin password
  }

  private signAccessToken(user: any): string {
    const payload = { correo: user.email ?? user.correo ?? user.username, sub: user.id ?? user._id };
    const expiresIn = this.config.get<string>('JWT_EXPIRES_IN') || '15m';
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET') || 'secret',
      expiresIn,
    });
  }

  private signRefreshToken(user: any): string {
    const payload = { sub: user.id ?? user._id, type: 'refresh' };
    const secret = this.config.get<string>('JWT_REFRESH_SECRET') || (this.config.get<string>('JWT_SECRET') || 'secret') + '_refresh';
    const expiresIn = this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  async issueTokens(user: any) {
    const accessToken = this.signAccessToken(user);
    const refreshToken = this.signRefreshToken(user);
    const { password: _omit, password: _omit2, ...safeUser } = user;
    return { accessToken, refreshToken, safeUser };
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const secret = this.config.get<string>('JWT_REFRESH_SECRET') || (this.config.get<string>('JWT_SECRET') || 'secret') + '_refresh';
      const payload: any = this.jwtService.verify(refreshToken, { secret });
      if (payload?.type !== 'refresh') throw new Error('Tipo inválido');
      // Opcional: aquí podrías comprobar revocación de RT en BD
      const user = await this.usuariosService.findByEmail(payload.sub);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');
      return this.signAccessToken(user);
    } catch {
      throw new UnauthorizedException('Refresh inválido o vencido');
    }
  }
}
