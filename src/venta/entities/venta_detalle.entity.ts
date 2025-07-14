import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venta } from './venta.entity';
import { Medicamentos } from 'src/products/entity/products.entity';

@Entity()
export class VentaDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta, venta => venta.detalles)
  venta: Venta;

  @ManyToOne(() => Medicamentos, { eager: true })
  medicamento: Medicamentos;

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioUnitario: number;
}