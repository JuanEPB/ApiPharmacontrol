import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from 'src/users/entity/users.entity';
import { Medicamentos } from 'src/products/entity/products.entity';

@Entity()
export class HistorialImportacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @ManyToOne(() => Usuario, usuario => usuario.historialImportaciones)
  usuario: Usuario;

  @ManyToOne(() => Medicamentos, medicamento => medicamento.id)
  medicamento: Medicamentos;

  @Column()
  cantidad: number;

  @Column({ type: 'text' })
  detalles: string;
}
