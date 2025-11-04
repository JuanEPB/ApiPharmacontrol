import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { CreateConfiguracionDto } from './dto/create-configuracion.dto';
import { UpdateConfiguracionDto } from './dto/update-configuracion.dto';

@Controller('configuracion')
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Post('crear')
  crear(@Body() dto: CreateConfiguracionDto) {
    return this.configuracionService.crear(dto);
  }

  @Get('empresa/:empresaId')
  obtenerPorEmpresa(@Param('empresaId') empresaId: number) {
    return this.configuracionService.obtenerPorEmpresa(empresaId);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() dto: UpdateConfiguracionDto) {
    return this.configuracionService.actualizar(id, dto);
  }
}
