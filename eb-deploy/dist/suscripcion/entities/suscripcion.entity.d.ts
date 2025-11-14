import { Empresa } from '../../empresa/entities/empresa.entity';
import { Plan } from '../../plan/entities/plan.entity';
export declare class Suscripcion {
    id: number;
    empresa: Empresa;
    plan: Plan;
    fecha_inicio: Date;
    fecha_fin: Date;
    activa: boolean;
    monto_pagado: number;
    estado_pago: string;
    creado_en: Date;
    actualizado_en: Date;
}
