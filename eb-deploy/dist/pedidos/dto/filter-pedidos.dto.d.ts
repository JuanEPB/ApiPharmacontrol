import { PedidoStatus } from './pedido-status.enum';
export declare class FilterPedidosDto {
    estatus?: PedidoStatus;
    page?: number;
    limit?: number;
}
