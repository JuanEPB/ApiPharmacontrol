import { Farmacia } from '../../farmacia/entities/farmacia.entity';
import { Suscripcion } from '../../suscripcion/entities/suscripcion.entity';
import { Plan } from 'src/plan/entities/plan.entity';
export declare class Empresa {
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
    farmacias: Farmacia[];
    suscripciones: Suscripcion[];
}
