import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoItem } from './entities/pedido-item.entity';
import { PedidoStatus } from './dto/pedido-status.enum';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Farmacia } from 'src/farmacia/entities/farmacia.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidoItem) private readonly itemRepo: Repository<PedidoItem>,
    @InjectRepository(Proveedor) private readonly proveedorRepo: Repository<Proveedor>,
    @InjectRepository(Farmacia) private readonly farmaciaRepo: Repository<Farmacia>,
    @InjectRepository(Medicamentos) private readonly medRepo: Repository<Medicamentos>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreatePedidoDto) {
    if (!dto || !Array.isArray(dto.items) || dto.items.length === 0) {
    throw new BadRequestException('El pedido requiere al menos 1 item');
  }

    const proveedor = await this.proveedorRepo.findOne({ where: { id: dto.proveedorId } });
    const farmacia  = await this.farmaciaRepo.findOne({ where: { id: dto.farmaciaId } });
    if (!proveedor || !farmacia) throw new NotFoundException('Proveedor o Farmacia no válidos');

    let total = 0;
    const items: PedidoItem[] = [];

    for (const i of dto.items) {
      const med = await this.medRepo.findOne({ where: { id: i.medicamentoId } });
      if (!med) throw new NotFoundException(`Medicamento ${i.medicamentoId} no existe`);

      const precio = i.precioUnitario ?? Number(med.precio ?? 0);
      const subtotal = +(precio * i.cantidad).toFixed(2);
      total += subtotal;

      items.push(this.itemRepo.create({
        medicamento: med,
        cantidad: i.cantidad,
        precioUnitario: precio.toFixed(2),
        subtotal: subtotal.toFixed(2),
        lote: i.lote,
        fechaCaducidad: i.fechaCaducidad as any,
      }));
    }

    const pedido = this.pedidoRepo.create({
      proveedor,
      farmacia,
      estatus: PedidoStatus.ENVIADO,
      total: total.toFixed(2),
      items,
    });

    return this.pedidoRepo.save(pedido);
  }

  async findAll() {
    return this.pedidoRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: { proveedor: true, farmacia: true, items: { medicamento: true } },
    });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  /**
   * Al pasar a RECIBIDO, incrementa control_medicamentos.stock
   * con la cantidad de cada item del pedido.
   */
  async updateStatus(id: number, dto: UpdateStatusDto) {
    const pedido = await this.findOne(id);

    if (pedido.estatus === PedidoStatus.RECIBIDO && dto.estatus === PedidoStatus.RECIBIDO) {
      throw new BadRequestException('El pedido ya fue recibido');
    }

    if (dto.estatus !== PedidoStatus.RECIBIDO) {
      pedido.estatus = dto.estatus;
      return this.pedidoRepo.save(pedido);
    }

    // === RECIBIR PEDIDO: sumamos stock en control_medicamentos ===
    await this.dataSource.transaction(async (manager) => {
      for (const it of pedido.items) {
        // Incremento atómico para evitar condiciones de carrera
        await manager
          .getRepository(Medicamentos)
          .createQueryBuilder()
          .update()
          .set({ stock: () => `stock + ${it.cantidad}` })
          .where({ id: it.medicamento.id })
          .execute();
      }

      pedido.estatus = PedidoStatus.RECIBIDO;
      pedido.fechaRecibido = new Date();
      await manager.getRepository(Pedido).save(pedido);
    });

    return this.findOne(id);
  }
}
