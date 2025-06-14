import { Controller, Get, Put, Post, Param, Body, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create.categoria.dto';

@Controller('categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) {}

    @Get('/all')
    async getAll() {
        return await this.categoriasService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.categoriasService.findOne(id);
    }
    @Post('/create')
    async create(@Body() createCategoriaDto: CreateCategoriaDto) {
        return await this.categoriasService.create(createCategoriaDto);
    }
    @Put('/update/:id')
    async update(@Param('id') id: number, @Body() updateCategoriaDto: any) {
        return await this.categoriasService.update(id, updateCategoriaDto);
    }
    @Delete('/delete/:id')
    async delete(@Param('id') id: number) {
        return await this.categoriasService.delete(id);
    }


}
