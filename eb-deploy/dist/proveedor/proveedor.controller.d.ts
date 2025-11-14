import { ProveedorService } from './proveedor.service';
import { Proveedor } from './entity/proveedor.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
import { UpdateProvedorDto } from './dto/update-proveedor.dto';
export declare class ProveedorController {
    private readonly proveedorService;
    constructor(proveedorService: ProveedorService);
    getAll(): Promise<Proveedor[]>;
    getById(id: number): Promise<Proveedor | null>;
    update(id: number, UpdateProvedorDto: UpdateProvedorDto): Promise<Proveedor | null>;
    delete(id: number): Promise<Proveedor | null>;
    findMedicamentos(id: number): Promise<Medicamentos[]>;
}
