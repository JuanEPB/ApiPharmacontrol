import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MedicamentosService } from './products.service';
import { CreateMedicamentoDto } from './dto/create_product.dto';
import { UpdateMedicamentoDto } from './dto/update_medicamento.dto';
import { Medicamentos } from './entity/products.entity';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Get('/all')
  async getAll() {
    return await this.medicamentosService.findAll();
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

}
