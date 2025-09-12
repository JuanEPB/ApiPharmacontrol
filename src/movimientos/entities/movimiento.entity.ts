// ...existing code...
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lote } from '../../lotes/entities/lote.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Tipo } from '../dto/tipo.enum';

@Entity({ name: 'movimientos' })
export class Movimiento {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    type: 'enum',
    enum: Tipo,
  })
  tipo: Tipo;

  @ManyToOne(() => Lote, (lote) => lote.movimientos, { nullable: true })
  @JoinColumn({ name: 'id_lote' })
  lote: Lote;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientos, { nullable: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ length: 100, nullable: true })
  referencia: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  // referencia al documento almacenado en MongoDB (ObjectId en string)
  @Column({ name: 'id_documento', length: 24, nullable: true })
  id_documento: string;
}