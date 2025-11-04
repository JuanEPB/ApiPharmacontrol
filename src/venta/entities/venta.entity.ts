import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { Usuario } from 'src/users/entity/users.entity';
import { VentaDetalle } from './venta_detalle.entity';
import { Farmacia } from 'src/farmacia/entities/farmacia.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @CreateDateColumn()
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @OneToMany(() => VentaDetalle, detalle => detalle.venta, { cascade: true })
  detalles: VentaDetalle[];

  @ManyToOne(() => Farmacia, (farmacia) => farmacia.ventas, { eager: true })
  @JoinColumn({ name: 'farmacia_id' })
  farmacia: Farmacia;
}