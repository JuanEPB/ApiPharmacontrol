import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FarmaciaService } from './farmacia.service';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { UpdateFarmaciaDto } from './dto/update-farmacia.dto';

@Controller('farmacia')
export class FarmaciaController {
  constructor(private readonly farmaciaService: FarmaciaService) {}

  // Crear
  @Post()
  create(@Body() dto: CreateFarmaciaDto) {
    return this.farmaciaService.create(dto);
  }

  // Listar (opcionalmente por empresa con ?empresaId=)
  @Get()
  findAll(@Query('empresaId') empresaId?: string) {
    const id = empresaId ? Number(empresaId) : undefined;
    return this.farmaciaService.findAll(id);
  }

  // Listar por empresa (endpoint dedicado)
  @Get('empresa/:empresaId')
  findByEmpresa(@Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.farmaciaService.findByEmpresa(empresaId);
  }

  // Obtener una
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.farmaciaService.findOne(id);
  }

  // Actualizar
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFarmaciaDto) {
    return this.farmaciaService.update(id, dto);
  }

  // Eliminar
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmaciaService.remove(id);
  }
}
