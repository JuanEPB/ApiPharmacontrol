import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class PedidosController {
    private readonly service;
    constructor(service: PedidosService);
    findAll(): Promise<import("./entities/pedido.entity").Pedido[]>;
    findOne(id: number): Promise<import("./entities/pedido.entity").Pedido>;
    create(dto: CreatePedidoDto): Promise<import("./entities/pedido.entity").Pedido>;
    updateStatus(id: number, dto: UpdateStatusDto): Promise<import("./entities/pedido.entity").Pedido>;
}
