import { ConfiguracionService } from './configuracion.service';
import { CreateConfiguracionDto } from './dto/create-configuracion.dto';
import { UpdateConfiguracionDto } from './dto/update-configuracion.dto';
export declare class ConfiguracionController {
    private readonly configuracionService;
    constructor(configuracionService: ConfiguracionService);
    crear(dto: CreateConfiguracionDto): Promise<import("./entities/configuracion.entity").ConfiguracionEmpresa>;
    obtenerPorEmpresa(empresaId: number): Promise<import("./entities/configuracion.entity").ConfiguracionEmpresa>;
    actualizar(id: number, dto: UpdateConfiguracionDto): Promise<import("./entities/configuracion.entity").ConfiguracionEmpresa>;
}
