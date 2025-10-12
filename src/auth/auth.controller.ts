import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; contraseña: string }) {
    const user = await this.authService.validateUser(body.email, body.contraseña);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

    @Post('refresh')
  async refresh(@Body() body) {
    const { refreshToken } = body;
    if (!refreshToken) throw new UnauthorizedException('No refresh token');
    return this.authService.refresh(refreshToken);
  }
}
