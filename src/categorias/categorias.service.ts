import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    // Aseguramos tipo parcial de Categoria antes de crear/guardar
    const categoria = this.categoriaRepository.create(createCategoriaDto as Partial<Categoria>);
    return await this.categoriaRepository.save(categoria as Categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ id_categoria: id });
    if (!categoria) throw new NotFoundException('Categoria no encontrada');
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ id_categoria: id });
    if (!categoria) throw new NotFoundException('Categoria no encontrada');
    Object.assign(categoria, updateCategoriaDto as any);
    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.categoriaRepository.findOneBy({ id_categoria: id });
    if (!categoria) throw new NotFoundException('Categoria no encontrada');
    await this.categoriaRepository.remove(categoria);
  }
}

