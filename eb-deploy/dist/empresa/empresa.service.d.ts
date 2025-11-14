import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { Plan } from '../plan/entities/plan.entity';
import { Suscripcion } from '../suscripcion/entities/suscripcion.entity';
export declare class EmpresaService {
    private readonly empresaRepo;
    private readonly planRepo;
    private readonly suscripcionRepo;
    constructor(empresaRepo: Repository<Empresa>, planRepo: Repository<Plan>, suscripcionRepo: Repository<Suscripcion>);
    findAll(): Promise<Empresa[]>;
    findOne(id: number): Promise<Empresa>;
    create(data: any): Promise<{
        suscripcion: Suscripcion;
        id: number;
        nombre: string;
        rfc: string;
        direccion: string;
        email_contacto: string;
        telefono_contacto: string;
        plan: Plan;
        estado: string;
        fecha_registro: Date;
        fecha_expiracion: Date;
        farmacias: import("../farmacia/entities/farmacia.entity").Farmacia[];
        suscripciones: Suscripcion[];
    }>;
    update(id: number, data: any): Promise<Empresa>;
    remove(id: number): Promise<Empresa>;
    checkTrialStatus(id: number): Promise<{
        enPrueba: boolean;
        diasRestantes?: undefined;
        fechaFin?: undefined;
    } | {
        enPrueba: boolean;
        diasRestantes: number;
        fechaFin: string;
    }>;
}
