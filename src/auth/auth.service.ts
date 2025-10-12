import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private refreshTokens: string[] = []; // Store refresh tokens
  
  async validateUser(email: string, contraseña: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && await bcrypt.compare(contraseña, user.contraseña)) {
      const { contraseña, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, rol: user.rol };

    return {
      accessToken: this.jwtService.sign(payload), // 👈 siempre en camelCase
      user,
    };
  }

  async refresh(refreshToken: string) {
    if (!this.refreshTokens.includes(refreshToken)) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const decoded = this.jwtService.verify(refreshToken);
    const payload = { sub: decoded.sub, username: decoded.username };
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    return { accessToken: newAccessToken };
  }
}
