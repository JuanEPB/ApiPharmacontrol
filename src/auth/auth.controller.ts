import { Controller, Post, Body, UnauthorizedException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';

@Controller('auth') // si tu app tiene globalPrefix 'api', quedará /api/auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    // NO cambiar nombres: email y contraseña
    const user = await this.authService.validateUser(loginDto.email, loginDto.contraseña);
    if (!user) throw new UnauthorizedException('Correo o contraseña incorrectos');

    const { accessToken, refreshToken, safeUser } = await this.authService.issueTokens(user);

    // Guardamos refresh en cookie httpOnly
    res.cookie('rt', refreshToken, {
      httpOnly: true,
      secure: false,     // en local sin HTTPS
      sameSite: 'lax',
      path: '/api/auth', // ¡importante!
      maxAge: 1000*60*60*24*7,
    });

    return res.status(200).json({ accessToken, user: safeUser });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const rt = req.cookies?.rt;
    if (!rt) throw new UnauthorizedException('Sin refresh token');

    const accessToken = await this.authService.refreshAccessToken(rt);
    return res.status(200).json({ accessToken });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('rt', { path: '/api/auth' }); // mismo path que arriba
    return res.status(200).json({ ok: true });
  }
}
