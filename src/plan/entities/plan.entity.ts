import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';

@Entity('plan')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_mensual: number;

  @Column({ type: 'int', default: 1 })
  limiteFarmacias: number;

  @Column({ type: 'int', default: 10 })
  limiteUsuarios: number;

  @Column({ type: 'int', default: 100 })
  limiteReportes: number;

  @Column({ type: 'int', default: 100 })
  limiteRegistros: number;

  @Column({ type: 'int', nullable: true })
  periodo_prueba_dias: number | null;

  @Column({ default: false })
  movil: boolean;

  @Column({ default: false})
  IA: boolean;

  @Column({ default: 'Básico' })
  nivel_soporte: string;

  @Column({ nullable: true })
  descripcion: string;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;

  // Relación con empresa
  @OneToMany(() => Empresa, (empresa) => empresa.plan)
  empresas: Empresa[];
}
