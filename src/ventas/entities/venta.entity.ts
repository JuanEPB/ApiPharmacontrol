// ...existing code...
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { DetalleVenta } from '../../detalle_ventas/entities/detalle_venta.entity';
import { Pago } from '../dto/pago.enum';
import { Estado } from '../dto/estado.enum';

@Entity({ name: 'ventas' })
export class Venta {
  @PrimaryGeneratedColumn({ name: 'id_venta' })
  id_venta: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.ventas)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total: number;

  @Column({
    type: 'enum',
    enum: Pago,
    nullable: true,
  })
  metodo_pago: Pago;

  @Column({
    type: 'enum',
    enum: Estado,
    default: Estado.PAGADA,
  })
  estado: Estado;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
  detalleVentas: DetalleVenta[];
}