// ...existing code...
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lote } from '../../lotes/entities/lote.entity';
import { Estado } from '../dto/estado.enum';

@Entity({ name: 'proveedores' })
export class Proveedore {
  @PrimaryGeneratedColumn({ name: 'id_proveedor' })
  id_proveedor: number;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 150, nullable: true })
  contacto: string;

  @Column({ length: 30, nullable: true })
  telefono: string;

  @Column({ length: 150, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ length: 50, nullable: true })
  rfc: string;

  @Column({
    type: 'enum',
    enum: Estado,
    default: Estado.ACTIVO,
  })
  estado: Estado;

  @OneToMany(() => Lote, (lote) => lote.proveedor)
  lotes: Lote[];
}