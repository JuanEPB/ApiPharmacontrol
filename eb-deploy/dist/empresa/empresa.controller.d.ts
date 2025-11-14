import { EmpresaService } from './empresa.service';
export declare class EmpresaController {
    private readonly empresaService;
    constructor(empresaService: EmpresaService);
    findAll(): Promise<import("./entities/empresa.entity").Empresa[]>;
    findOne(id: number): Promise<import("./entities/empresa.entity").Empresa>;
    create(data: any): Promise<{
        suscripcion: import("../suscripcion/entities/suscripcion.entity").Suscripcion;
        id: number;
        nombre: string;
        rfc: string;
        direccion: string;
        email_contacto: string;
        telefono_contacto: string;
        plan: import("../plan/entities/plan.entity").Plan;
        estado: string;
        fecha_registro: Date;
        fecha_expiracion: Date;
        farmacias: import("../farmacia/entities/farmacia.entity").Farmacia[];
        suscripciones: import("../suscripcion/entities/suscripcion.entity").Suscripcion[];
    }>;
    update(id: number, data: any): Promise<import("./entities/empresa.entity").Empresa>;
    remove(id: number): Promise<import("./entities/empresa.entity").Empresa>;
    checkTrialStatus(id: number): Promise<{
        enPrueba: boolean;
        diasRestantes?: undefined;
        fechaFin?: undefined;
    } | {
        enPrueba: boolean;
        diasRestantes: number;
        fechaFin: string;
    }>;
    findActivas(): Promise<import("./entities/empresa.entity").Empresa[]>;
    findInactivas(): Promise<import("./entities/empresa.entity").Empresa[]>;
}
