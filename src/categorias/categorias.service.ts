import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entity/categorias.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create.categoria.dto';
import { UpdateCategoriaDto } from './dto/update.categoria.dto';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find();
    }

    async findOne(id: number): Promise<Categoria | null> {
        return this.categoriaRepository.findOneBy({ id });
    }

    async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
        const categoria = this.categoriaRepository.create({
            nombre: createCategoriaDto.nombre  
        });
        return this.categoriaRepository.save(categoria);
    }

    async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria | null> {
        const categoria = await this.categoriaRepository.findOneBy({ id });
        if (!categoria) {
            throw new Error('Categoria no encontrada'); // O lanzar una excepción si prefieres
        }
        Object.assign(categoria, updateCategoriaDto);

        return this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<Categoria | null> {
    
        const categoria = await this.categoriaRepository.findOneBy({ id });
        if (!categoria) {
            throw new Error('Categoria no encontrada'); // O lanzar una excepción si prefieres
        }
        return this.categoriaRepository.remove(categoria);
    }


    // Aquí puedes implementar los métodos necesarios para manejar las categorías
    // como crear, actualizar, eliminar y listar categorías.
    // Por ejemplo:
    
    // async create(createCategoriaDto: CreateCategoriaDto) {
    //   // Lógica para crear una categoría
    // }
    
    // async findAll() {
    //   // Lógica para obtener todas las categorías
    // }
    
    // async findOne(id: number) {
    //   // Lógica para obtener una categoría por ID
    // }
    
    // async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    //   // Lógica para actualizar una categoría
    // }
    
    // async delete(id: number) {
    //   // Lógica para eliminar una categoría
    // }
}
