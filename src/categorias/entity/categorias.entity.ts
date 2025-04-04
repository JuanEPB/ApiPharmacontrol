import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Medicamentos } from 'src/products/entity/products.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @OneToMany(() => Medicamentos, medicamento => medicamento.categoria)
  medicamentos: Medicamentos[];
}
