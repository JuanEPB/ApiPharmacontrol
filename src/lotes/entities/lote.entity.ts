// ...existing code...
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Proveedore } from '../../proveedores/entities/proveedore.entity';
import { DetalleVenta } from '../../detalle_ventas/entities/detalle_venta.entity';
import { Movimiento } from '../../movimientos/entities/movimiento.entity';
import { Estado } from '../dto/estado.enum';

@Entity({ name: 'lotes' })
export class Lote {
  @PrimaryGeneratedColumn({ name: 'id_lote' })
  id_lote: number;

  @ManyToOne(() => Producto, (producto) => producto.lotes)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @Column({ length: 80, nullable: true })
  numero_lote: string;

  @Column({ type: 'date', nullable: true })
  fecha_ingreso: Date;

  @Column({ type: 'date', nullable: true })
  fecha_caducidad: Date;

  @Column({ type: 'int', default: 0 })
  stock_inicial: number;

  @Column({ type: 'int', default: 0 })
  stock_actual: number;

  @Column({ type: 'int', default: 0 })
  stock_minimo: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  precio_compra: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  precio_venta: number;

  @ManyToOne(() => Proveedore, (proveedor) => proveedor.lotes, { nullable: true })
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedore;

  @Column({
    type: 'enum',
    enum: Estado,
    default: Estado.ACTIVO,
  })
  estado: Estado;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.lote)
  detalleVentas: DetalleVenta[];

  @OneToMany(() => Movimiento, (mov) => mov.lote)
  movimientos: Movimiento[];
}