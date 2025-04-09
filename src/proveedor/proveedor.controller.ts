import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './entity/proveedor.entity';
import { UpdateMedicamentoDto } from 'src/products/dto/update_medicamento.dto';
import { Medicamentos } from 'src/products/entity/products.entity';
import { UpdateProvedorDto } from './dto/update-proveedor.dto';

@Controller('proveedores')
export class ProveedorController {

    constructor(private readonly proveedorService: ProveedorService){}

    @Get('/all')
    async getAll(){
        return await this.proveedorService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<Proveedor | null> {
        return await this.proveedorService.getById(id);
    }

    @Put('/update/:id')
    update(
      @Param('id') id: number,
      @Body() UpdateProvedorDto: UpdateProvedorDto): Promise<Proveedor | null> {
      return this.proveedorService.update(id, UpdateProvedorDto);
    }
  
    @Delete('/delete/:id')
    delete(@Param('id') id: number): Promise<Proveedor | null> {
      return this.proveedorService.delete(id);
    }
}
