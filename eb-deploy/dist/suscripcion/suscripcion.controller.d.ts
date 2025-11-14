import { SuscripcionService } from './suscripcion.service';
export declare class SuscripcionController {
    private readonly suscripcionService;
    constructor(suscripcionService: SuscripcionService);
    crearInicial(empresaId: number, plan?: string): Promise<import("./entities/suscripcion.entity").Suscripcion>;
    renovar(empresaId: number, dias: number): Promise<import("./entities/suscripcion.entity").Suscripcion>;
    verificarVencidas(): Promise<number>;
}
