import { Usuario } from 'src/users/entity/users.entity';
import { VentaDetalle } from './venta_detalle.entity';
import { Farmacia } from 'src/farmacia/entities/farmacia.entity';
export declare class Venta {
    id: number;
    usuario: Usuario;
    fecha: Date;
    total: number;
    detalles: VentaDetalle[];
    farmacia: Farmacia;
}
