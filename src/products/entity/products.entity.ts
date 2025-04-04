import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from 'src/categorias/entity/categorias.entity';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';

@Entity('medicamentos')
export class Medicamentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  lote: string;

  @Column({ type: 'date' })
  caducidad: Date;

  @ManyToOne(() => Proveedor, proveedor => proveedor.medicamentos, { nullable: true, eager: true })
  proveedor: Proveedor;

  @Column()
  stock: number;

  @Column({ type: 'float' })
  precio: number;

  @ManyToOne(() => Categoria, categoria => categoria.medicamentos, { nullable: true, eager: true })
  categoria: Categoria;
}
