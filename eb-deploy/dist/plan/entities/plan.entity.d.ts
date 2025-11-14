import { Empresa } from '../../empresa/entities/empresa.entity';
export declare class Plan {
    id: number;
    nombre: string;
    precio_mensual: number;
    limiteFarmacias: number;
    limiteUsuarios: number;
    limiteReportes: number;
    limiteRegistros: number;
    periodo_prueba_dias: number | null;
    movil: boolean;
    IA: boolean;
    nivel_soporte: string;
    descripcion: string;
    creado_en: Date;
    actualizado_en: Date;
    empresas: Empresa[];
}
