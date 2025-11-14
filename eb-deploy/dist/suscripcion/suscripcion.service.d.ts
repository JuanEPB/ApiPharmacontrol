import { Repository } from 'typeorm';
import { Suscripcion } from './entities/suscripcion.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Plan } from '../plan/entities/plan.entity';
export declare class SuscripcionService {
    private readonly suscripcionRepo;
    private readonly empresaRepo;
    private readonly planRepo;
    constructor(suscripcionRepo: Repository<Suscripcion>, empresaRepo: Repository<Empresa>, planRepo: Repository<Plan>);
    crearSuscripcionInicial(empresaId: number, planNombre: string): Promise<Suscripcion>;
    renovarSuscripcion(empresaId: number, dias: number): Promise<Suscripcion>;
    verificarSuscripcionesVencidas(): Promise<number>;
}
