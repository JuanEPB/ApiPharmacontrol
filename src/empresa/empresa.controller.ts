import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';

@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  // 🔹 Obtener todas las empresas con sus relaciones
  @Get()
  async findAll() {
    return await this.empresaService.findAll();
  }

  // 🔹 Obtener una empresa por ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const empresa = await this.empresaService.findOne(id);
    if (!empresa) throw new NotFoundException(`Empresa con ID ${id} no encontrada`);
    return empresa;
  }

  // 🔹 Crear una nueva empresa
  @Post()
  async create(@Body() data: any) {
    return await this.empresaService.create(data);
  }

  // 🔹 Actualizar los datos de una empresa
  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return await this.empresaService.update(id, data);
  }

  // 🔹 Eliminar una empresa
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.empresaService.remove(id);
  }

  // 🔹 Verificar si la empresa sigue en periodo de prueba
  @Get(':id/trial-status')
  async checkTrialStatus(@Param('id') id: number) {
    return await this.empresaService.checkTrialStatus(id);
  }

  // 🔹 Consultar empresas activas
  @Get('estado/activas')
  async findActivas() {
    const empresas = await this.empresaService.findAll();
    return empresas.filter((e) => e.estado === 'activo');
  }

  // 🔹 Consultar empresas inactivas
  @Get('estado/inactivas')
  async findInactivas() {
    const empresas = await this.empresaService.findAll();
    return empresas.filter((e) => e.estado === 'inactivo');
  }
}
