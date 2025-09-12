// ...existing code...
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Lote } from '../../lotes/entities/lote.entity';

@Entity({ name: 'detalle_ventas' })
export class DetalleVenta {
  @PrimaryGeneratedColumn({ name: 'id_detalle' })
  id_detalle: number;

  @ManyToOne(() => Venta, (venta) => venta.detalleVentas)
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;

  @ManyToOne(() => Lote, (lote) => lote.detalleVentas)
  @JoinColumn({ name: 'id_lote' })
  lote: Lote;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  descuento: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;
}