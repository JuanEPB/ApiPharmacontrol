import { Empresa } from '../../empresa/entities/empresa.entity';
export declare class ConfiguracionEmpresa {
    id: number;
    empresa: Empresa;
    logo_url: string;
    lema: string;
    color_primario: string;
    color_secundario: string;
    mostrar_marca: boolean;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}
