import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.contraseña);
    
    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
    console.log('usuario: ', user); 
    return this.authService.login(user);
  }
}
