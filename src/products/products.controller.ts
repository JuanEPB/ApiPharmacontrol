import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { MedicamentosService } from './products.service';
import { CreateMedicamentoDto } from './dto/create_product.dto';
import { UpdateMedicamentoDto } from './dto/update_medicamento.dto';
import { Medicamentos } from './entity/products.entity';
import { PaginationQueryDto } from 'src/auth/pagination-query.dto';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

    /**
     * Endpoint optimizado y paginado. Reemplaza a /all.
     * Acepta queries como: /medicamentos?page=1&limit=10
     */ 
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
      return this.medicamentosService.findAll(paginationQuery);
    }
    @Get('all')
    findAllMedicamentos(): Promise<Medicamentos[]> {
      return this.medicamentosService.findAllMedicamentos();
    }

    @Get('count')
    async contar(): Promise<{ total: number }> {
      const total = await this.medicamentosService.contarMedicamentos();
      return { total };
    }
    @Get('caducidad')
    async getMedicamentosCaducidad(): Promise<{ total: number, medicamentos: Medicamentos[] }> {
      return await this.medicamentosService.dataCaducidadMedicamentos();
    }
    
    @Get('stats')
    async getStats(): Promise<{ total: number; porCaducar: number; caducados: number; porCategoria: Record<string, number>; }> {
    return this.medicamentosService.getStats();
  }


    // Obtener un medicamento por su ID
    @Get('/:id')
    findOne(@Param('id') id: number): Promise<Medicamentos | null> {
      return this.medicamentosService.findOne(id);
    }
  
    // Crear un nuevo medicamento
    @Post('/create')
    create(@Body() createMedicamentoDto: CreateMedicamentoDto){
      return this.medicamentosService.create(createMedicamentoDto);
    }
  
    // Actualizar un medicamento por su ID
    @Put('/update/:id')
    update(
      @Param('id') id: number,
      @Body() updateMedicamentoDto: UpdateMedicamentoDto
    ): Promise<Medicamentos | null> {
      return this.medicamentosService.update(id, updateMedicamentoDto);
    }
  
    // Eliminar un medicamento por su ID
    @Delete('/delete/:id')
    delete(@Param('id') id: number): Promise<Medicamentos | null> {
      return this.medicamentosService.delete(id);
    }

    

    @Get('count/nombre/:nombre')
    async countByNombre(@Param('nombre') nombre: string) {
      const total = await this.medicamentosService.countByName(nombre);
      return {total};
    }

}
