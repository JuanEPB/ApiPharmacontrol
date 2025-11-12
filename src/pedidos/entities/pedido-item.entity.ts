import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Medicamentos } from 'src/products/entity/products.entity';

@Entity('pedido_items')
export class PedidoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (p) => p.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @ManyToOne(() => Medicamentos, { eager: true })
  @JoinColumn({ name: 'medicamento_id' })
  medicamento: Medicamentos;

  @Column('int')
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 12, scale: 2 })
  precioUnitario: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: string;

  @Column({ nullable: true })
  lote?: string;

  @Column({ name: 'fecha_caducidad', type: 'date', nullable: true })
  fechaCaducidad?: string;
}
