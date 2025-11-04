import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';

@Entity('configuracion_empresa')
export class ConfiguracionEmpresa {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Empresa, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column({ nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  lema: string;

  @Column({ nullable: true })
  color_primario: string;

  @Column({ nullable: true })
  color_secundario: string;

  @Column({ default: true })
  mostrar_marca: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
