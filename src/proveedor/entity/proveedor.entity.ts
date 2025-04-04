import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Medicamentos } from 'src/products/entity/products.entity';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  contacto: string;

  @Column({ type: 'text' })
  direccion: string;

  @OneToMany(() => Medicamentos, medicamento => medicamento.proveedor)
  medicamentos: Medicamentos[];
}
