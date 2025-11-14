import { Medicamentos } from './entity/products.entity';
import { Repository } from 'typeorm';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Categoria } from 'src/categorias/entity/categorias.entity';
import { CreateMedicamentoDto } from './dto/create_product.dto';
import { UpdateMedicamentoDto } from './dto/update_medicamento.dto';
export declare class MedicamentosService {
    private medicamentoRepository;
    private proveedorRepository;
    private categoriaRepository;
    constructor(medicamentoRepository: Repository<Medicamentos>, proveedorRepository: Repository<Proveedor>, categoriaRepository: Repository<Categoria>);
    findAll(): Promise<Medicamentos[]>;
    findOne(id: number): Promise<Medicamentos | null>;
    create(createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamentos>;
    update(id: number, updateMedicamentoDto: UpdateMedicamentoDto): Promise<Medicamentos | null>;
    delete(id: number): Promise<Medicamentos | null>;
    contarMedicamentos(): Promise<number>;
    countByName(name: string): Promise<{
        total: number;
    }>;
    dataCaducidadMedicamentos(): Promise<{
        total: number;
        medicamentos: Medicamentos[];
    }>;
    caducidadMedicamentos(): Promise<Medicamentos[]>;
    lowStockMedicamentos(): Promise<Medicamentos[]>;
    findByName(name: string): Promise<Medicamentos[]>;
    findByLote(lote: string): Promise<Medicamentos[]>;
    findByCaducidad(caducidad: Date): Promise<Medicamentos[]>;
    findByStock(stock: number): Promise<Medicamentos[]>;
    findByPrecio(precio: number): Promise<Medicamentos[]>;
    findByProveedor(proveedorId: number): Promise<Medicamentos[]>;
    findByCategoria(categoriaId: number): Promise<Medicamentos[]>;
    getStats(): Promise<{
        total: number;
        porCaducar: number;
        caducados: number;
        porCategoria: any;
    }>;
}
