import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HistorialImportacion } from 'src/historial_importacion/entity/historial_importacion.entity';
import { HistorialExportacion } from 'src/historial_exportacion/entity/historial_exportacion.entity';
import { Rol } from '../dto/roles.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.USUARIO, // ← este es el valor por defecto
  })
  rol: Rol;

  @Column({ length: 255 })
  contraseña: string;

  @Column({ length: 100, unique: true })
  email: string;

}
