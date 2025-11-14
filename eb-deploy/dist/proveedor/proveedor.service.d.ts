import { Proveedor } from './entity/proveedor.entity';
import { Repository } from 'typeorm';
import { Medicamentos } from 'src/products/entity/products.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProvedorDto } from './dto/update-proveedor.dto';
export declare class ProveedorService {
    private proveedorRepository;
    private medicamentoRepository;
    constructor(proveedorRepository: Repository<Proveedor>, medicamentoRepository: Repository<Medicamentos>);
    getAll(): Promise<Proveedor[]>;
    getById(id: number): Promise<Proveedor | null>;
    create(CreateProveedorDto: CreateProveedorDto): Promise<Proveedor>;
    update(id: number, UpdateProvedorDto: UpdateProvedorDto): Promise<Proveedor>;
    delete(id: number): Promise<Proveedor | null>;
    findMedicamentos(proveedorId: number): Promise<Medicamentos[]>;
}
