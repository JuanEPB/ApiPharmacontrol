import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from '../dto/roles.enum';
import { Farmacia } from '../../farmacia/entities/farmacia.entity';

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
    default: Rol.USUARIO, 
  })
  rol: Rol;

  @Column({ length: 255 })
  contraseña: string;

  @Column({ length: 100, unique: true })
  email: string;

  @ManyToOne(() => Farmacia, (farmacia) => farmacia.usuarios, { eager: true })
  @JoinColumn({ name: 'farmacia_id' })
  farmacia: Farmacia;
    static farmacia: any;
}