// historial-exportacion.controller.ts
import { Controller, Get, Param, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { HistorialExportacionService } from './historial_exportacion.service';
import { HistorialExportacion } from './entity/historial_exportacion.entity';

@Controller('historial-exportacion')
export class HistorialExportacionController {
  constructor(private readonly historialService: HistorialExportacionService) {}

  @Get()
  findAll(): Promise<HistorialExportacion[]> {
    return this.historialService.findAll();
  }

  // Buscar por rango de fechas: /historial-exportacion/por-fecha?inicio=2025-07-01&fin=2025-07-10
  @Get('por-fecha')
  async findByFecha(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ): Promise<HistorialExportacion[]> {
    if (!inicio || !fin) {
      throw new BadRequestException('Debe enviar las fechas inicio y fin');
    }
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    return this.historialService.findByFecha(fechaInicio, fechaFin);
  }

  // Buscar por nombre usuario: /historial-exportacion/por-nombre?nombre=juan
  @Get('por-nombre/:nombre')
  findByNombreUsuario(@Param('nombre') nombre: string): Promise<HistorialExportacion[]> {
    if (!nombre) {
      throw new BadRequestException('Debe enviar el nombre de usuario');
    }
    return this.historialService.findByNombreUsuario(nombre);
  }

  // Buscar por id usuario: /historial-exportacion/por-usuario/5
  @Get('por-usuario/:usuarioId')
  findByUsuarioId(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<HistorialExportacion[]> {
    return this.historialService.findByUsuarioId(usuarioId);
  }
  // Buscar por id documento: /historial-exportacion/por-documento/60d5f9f8f1c2b8b8b8b8b8b8
  @Get('por-documento/:documentoId')
  findByDocumentoId(@Param('documentoId') documentoId: string): Promise<HistorialExportacion[]> {
    return this.historialService.findbyiddocumento(documentoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<HistorialExportacion | null> {
    return this.historialService.findOne(id);
  }
}
