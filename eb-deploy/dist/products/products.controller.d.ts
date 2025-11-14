import { MedicamentosService } from './products.service';
import { CreateMedicamentoDto } from './dto/create_product.dto';
import { UpdateMedicamentoDto } from './dto/update_medicamento.dto';
import { Medicamentos } from './entity/products.entity';
export declare class MedicamentosController {
    private readonly medicamentosService;
    constructor(medicamentosService: MedicamentosService);
    getAll(): Promise<Medicamentos[]>;
    contar(): Promise<{
        total: number;
    }>;
    getMedicamentosCaducidad(): Promise<{
        total: number;
        medicamentos: Medicamentos[];
    }>;
    getStats(): Promise<{
        total: number;
        porCaducar: number;
        caducados: number;
        porCategoria: Record<string, number>;
    }>;
    findOne(id: number): Promise<Medicamentos | null>;
    create(createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamentos>;
    update(id: number, updateMedicamentoDto: UpdateMedicamentoDto): Promise<Medicamentos | null>;
    delete(id: number): Promise<Medicamentos | null>;
    countByNombre(nombre: string): Promise<{
        total: {
            total: number;
        };
    }>;
}
