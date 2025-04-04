import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HistorialImportacion } from 'src/historial_importacion/entity/historial_importacion.entity';
import { HistorialExportacion } from 'src/historial_exportacion/entity/historial_exportacion.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  contraseña: string;

  @Column({ type: 'enum', enum: ['admin', 'usuario'] })
  rol: string;

  @OneToMany(() => HistorialImportacion, historial => historial.usuario)
  historialImportaciones: HistorialImportacion[];

  @OneToMany(() => HistorialExportacion, historial => historial.usuario)
  historialExportaciones: HistorialExportacion[];
}
