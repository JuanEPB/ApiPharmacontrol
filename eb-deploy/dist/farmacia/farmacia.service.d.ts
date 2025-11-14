import { Repository } from 'typeorm';
import { Farmacia } from './entities/farmacia.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { PlanService } from '../plan/plan.service';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { UpdateFarmaciaDto } from './dto/update-farmacia.dto';
export declare class FarmaciaService {
    private readonly farmaciaRepo;
    private readonly empresaRepo;
    private readonly planService;
    constructor(farmaciaRepo: Repository<Farmacia>, empresaRepo: Repository<Empresa>, planService: PlanService);
    create(dto: CreateFarmaciaDto): Promise<Farmacia>;
    findAll(empresaId?: number): Promise<Farmacia[]>;
    findByEmpresa(empresaId: number): Promise<Farmacia[]>;
    findOne(id: number): Promise<Farmacia>;
    update(id: number, dto: UpdateFarmaciaDto): Promise<Farmacia>;
    remove(id: number): Promise<Farmacia>;
}
