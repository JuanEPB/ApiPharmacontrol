import { Pedido } from './pedido.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
export declare class PedidoItem {
    id: number;
    pedido: Pedido;
    medicamento: Medicamentos;
    cantidad: number;
    precioUnitario: string;
    subtotal: string;
    lote?: string;
    fechaCaducidad?: string;
}
