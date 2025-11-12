import {
  Column, CreateDateColumn, Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, JoinColumn
} from 'typeorm';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Farmacia } from 'src/farmacia/entities/farmacia.entity';
import { PedidoItem } from './pedido-item.entity';
import { PedidoStatus } from '../dto/pedido-status.enum';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proveedor, { eager: true })
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @ManyToOne(() => Farmacia, { eager: true })
  @JoinColumn({ name: 'farmacia_id' })
  farmacia: Farmacia;

  @CreateDateColumn({ name: 'fecha_pedido' })
  fechaPedido: Date;

  @Column({ name: 'fecha_recibido', type: 'datetime', nullable: true })
  fechaRecibido: Date | null;

  @Column({ type: 'enum', enum: PedidoStatus, default: PedidoStatus.ENVIADO })
  estatus: PedidoStatus;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total: string;

  @OneToMany(() => PedidoItem, (i) => i.pedido, { cascade: true, eager: true })
  items: PedidoItem[];
}
