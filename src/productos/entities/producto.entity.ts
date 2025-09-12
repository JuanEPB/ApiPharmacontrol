// ...existing code...
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Estado } from '../dto/estado.enum';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Lote } from '../../lotes/entities/lote.entity';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  id_producto: number;

  @Column({ length: 100, nullable: true })
  sku: string;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 80, nullable: true })
  presentacion: string;

  @Column({ length: 30, nullable: true })
  unidad_medida: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({
    type: 'enum',
    enum: Estado,
    default: Estado.ACTIVO,
  })
  estado: Estado;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @OneToMany(() => Lote, (lote) => lote.producto)
  lotes: Lote[];
}