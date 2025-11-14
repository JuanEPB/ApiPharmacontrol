import { DataSource, Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoItem } from './entities/pedido-item.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Farmacia } from 'src/farmacia/entities/farmacia.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
export declare class PedidosService {
    private readonly pedidoRepo;
    private readonly itemRepo;
    private readonly proveedorRepo;
    private readonly farmaciaRepo;
    private readonly medRepo;
    private readonly dataSource;
    constructor(pedidoRepo: Repository<Pedido>, itemRepo: Repository<PedidoItem>, proveedorRepo: Repository<Proveedor>, farmaciaRepo: Repository<Farmacia>, medRepo: Repository<Medicamentos>, dataSource: DataSource);
    create(dto: CreatePedidoDto): Promise<Pedido>;
    findAll(): Promise<Pedido[]>;
    findOne(id: number): Promise<Pedido>;
    updateStatus(id: number, dto: UpdateStatusDto): Promise<Pedido>;
}
