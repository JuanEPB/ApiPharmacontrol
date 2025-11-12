// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; contraseña: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.contraseña);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const { accessToken, refreshToken } = await this.authService.issueTokens(user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, sameSite: 'lax', secure: false, maxAge: 1000 * 60 * 60 * 24 * 7, path: '/auth',
    });
    return { user, accessToken };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) throw new UnauthorizedException('No refresh cookie');

    const { accessToken, refreshToken } = await this.authService.refreshWithToken(token);
    if (refreshToken) {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true, sameSite: 'lax', secure: false, maxAge: 1000 * 60 * 60 * 24 * 7, path: '/auth',
      });
    }
    return { accessToken };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', { path: '/auth' });
    return { ok: true };
  }
}
