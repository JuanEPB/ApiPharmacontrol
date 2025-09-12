// ...existing code...
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Movimiento } from '../../movimientos/entities/movimiento.entity';
import { Rol } from '../dto/rol.enum';
import { Estado } from '../dto/estado.enum';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 150, unique: true })
  correo: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.USER,
  })
  rol: Rol;

  @Column({
    type: 'enum',
    enum: Estado,
    default: Estado.ACTIVO,
  })
  estado: Estado;

  @Column({ type: 'timestamp', nullable: true })
  ultimo_acceso: Date;

  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta[];

  @OneToMany(() => Movimiento, (movimiento) => movimiento.usuario)
  movimientos: Movimiento[];
}