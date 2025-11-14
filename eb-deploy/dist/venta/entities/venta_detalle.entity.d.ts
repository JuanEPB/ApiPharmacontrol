import { Venta } from './venta.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
export declare class VentaDetalle {
    id: number;
    venta: Venta;
    medicamento: Medicamentos;
    cantidad: number;
    precioUnitario: number;
}
