import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Usuario } from '../../users/entity/users.entity';
import { Venta } from '../../venta/entities/venta.entity';

@Entity('farmacia')
export class Farmacia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nombre: string;

  @Column({ length: 13 })
  rfc: string;

  @Column({ length: 255, nullable: true })
  direccion: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  lema: string;

  @Column({ length: 255, nullable: true })
  logo_url: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.farmacias, { eager: true })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;

  // 🔗 Relaciones
  @OneToMany(() => Usuario, (usuario) => Usuario.farmacia)
  usuarios: Usuario[];

  @OneToMany(() => Venta, (venta) => venta.farmacia)
  ventas: Venta[];
}
