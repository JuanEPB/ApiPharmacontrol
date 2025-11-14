import { Categoria } from './entity/categorias.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create.categoria.dto';
import { UpdateCategoriaDto } from './dto/update.categoria.dto';
export declare class CategoriasService {
    private categoriaRepository;
    constructor(categoriaRepository: Repository<Categoria>);
    findAll(): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria | null>;
    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria | null>;
    delete(id: number): Promise<Categoria | null>;
}
