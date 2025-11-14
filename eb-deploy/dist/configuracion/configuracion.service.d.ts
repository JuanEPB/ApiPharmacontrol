import { Repository } from 'typeorm';
import { ConfiguracionEmpresa } from './entities/configuracion.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { CreateConfiguracionDto } from './dto/create-configuracion.dto';
import { UpdateConfiguracionDto } from './dto/update-configuracion.dto';
export declare class ConfiguracionService {
    private readonly configRepo;
    private readonly empresaRepo;
    constructor(configRepo: Repository<ConfiguracionEmpresa>, empresaRepo: Repository<Empresa>);
    crear(dto: CreateConfiguracionDto): Promise<ConfiguracionEmpresa>;
    obtenerPorEmpresa(empresaId: number): Promise<ConfiguracionEmpresa>;
    actualizar(id: number, dto: UpdateConfiguracionDto): Promise<ConfiguracionEmpresa>;
}
