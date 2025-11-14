import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Farmacia } from 'src/farmacia/entities/farmacia.entity';
import { PedidoItem } from './pedido-item.entity';
import { PedidoStatus } from '../dto/pedido-status.enum';
export declare class Pedido {
    id: number;
    proveedor: Proveedor;
    farmacia: Farmacia;
    fechaPedido: Date;
    fechaRecibido: Date | null;
    estatus: PedidoStatus;
    total: string;
    items: PedidoItem[];
}
