// historial-exportacion.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from 'src/users/entity/users.entity';

@Entity()
export class HistorialExportacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @Column({ type: 'text' }) // puedes guardar el ID del documento de Mongo aquí
  documento: string;
}
