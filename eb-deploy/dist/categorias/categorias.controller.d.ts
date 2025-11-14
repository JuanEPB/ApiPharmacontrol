import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create.categoria.dto';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    getAll(): Promise<import("./entity/categorias.entity").Categoria[]>;
    findOne(id: number): Promise<import("./entity/categorias.entity").Categoria | null>;
    create(createCategoriaDto: CreateCategoriaDto): Promise<import("./entity/categorias.entity").Categoria>;
    update(id: number, updateCategoriaDto: any): Promise<import("./entity/categorias.entity").Categoria | null>;
    delete(id: number): Promise<import("./entity/categorias.entity").Categoria | null>;
}
