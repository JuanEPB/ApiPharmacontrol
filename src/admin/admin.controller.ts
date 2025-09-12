import { Controller, Get, Headers, ForbiddenException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Rol } from '../usuarios/dto/rol.enum';

@Controller('api/users')
export class AdminController {
  private readonly SERVICE_API_TOKEN = process.env.SERVICE_API_TOKEN;

  constructor(private readonly usersService: UsuariosService) {}

  @Get('admin-email')
  async getAdminEmails(@Headers('x-service-token') token: string) {
    if (token !== this.SERVICE_API_TOKEN) {
      throw new ForbiddenException('Token de servicio inválido');
    }

    // Obtener usuarios con rol admin desde el servicio
    const admins = await this.usersService.findByRole(Rol.ADMIN);

    // Extraer solo los correos
    const emails = admins.map(admin => admin.correo);

    return { emails };
  }
}
