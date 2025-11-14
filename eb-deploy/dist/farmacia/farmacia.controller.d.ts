import { FarmaciaService } from './farmacia.service';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { UpdateFarmaciaDto } from './dto/update-farmacia.dto';
export declare class FarmaciaController {
    private readonly farmaciaService;
    constructor(farmaciaService: FarmaciaService);
    create(dto: CreateFarmaciaDto): Promise<import("./entities/farmacia.entity").Farmacia>;
    findAll(empresaId?: string): Promise<import("./entities/farmacia.entity").Farmacia[]>;
    findByEmpresa(empresaId: number): Promise<import("./entities/farmacia.entity").Farmacia[]>;
    findOne(id: number): Promise<import("./entities/farmacia.entity").Farmacia>;
    update(id: number, dto: UpdateFarmaciaDto): Promise<import("./entities/farmacia.entity").Farmacia>;
    remove(id: number): Promise<import("./entities/farmacia.entity").Farmacia>;
}
