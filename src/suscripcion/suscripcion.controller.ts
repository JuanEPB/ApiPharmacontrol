import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { SuscripcionService } from './suscripcion.service';

@Controller('suscripciones')
export class SuscripcionController {
  constructor(private readonly suscripcionService: SuscripcionService) {}

  @Post('crear-inicial/:empresaId')
  crearInicial(
    @Param('empresaId') empresaId: number,
    @Body('plan') plan: string = 'Básico',
  ) {
    return this.suscripcionService.crearSuscripcionInicial(empresaId, plan);
  }

  @Post('renovar/:empresaId')
  renovar(@Param('empresaId') empresaId: number, @Body('dias') dias: number) {
    return this.suscripcionService.renovarSuscripcion(empresaId, dias);
  }

  @Get('verificar-vencidas')
  verificarVencidas() {
    return this.suscripcionService.verificarSuscripcionesVencidas();
  }
}
