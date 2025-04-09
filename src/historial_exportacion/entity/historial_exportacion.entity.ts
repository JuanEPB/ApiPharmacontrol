import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from 'src/users/entity/users.entity';
import { Medicamentos } from 'src/products/entity/products.entity';

@Entity()
export class HistorialExportacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @ManyToOne(() => Medicamentos)
  medicamento: Medicamentos;

  @Column()
  cantidad: number;

  @Column({ type: 'text' })
  detalles: string;
}
