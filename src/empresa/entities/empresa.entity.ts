import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Farmacia } from '../../farmacia/entities/farmacia.entity';
import { Suscripcion } from '../../suscripcion/entities/suscripcion.entity';
import { Plan } from 'src/plan/entities/plan.entity';

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nombre: string;

  @Column({ length: 13, unique: true })
  rfc: string;

  @Column({ length: 255, nullable: true })
  direccion: string;

  @Column({ length: 100, nullable: true })
  email_contacto: string;

  @Column({ length: 20, nullable: true })
  telefono_contacto: string;

  @ManyToOne(() => Plan, (plan) => plan.empresas, { eager: true })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column({ default: 'activo' })
  estado: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_expiracion: Date;

  @OneToMany(() => Farmacia, (farmacia) => farmacia.empresa)
  farmacias: Farmacia[];

  @OneToMany(() => Suscripcion, (suscripcion) => suscripcion.empresa)
  suscripciones: Suscripcion[];
}
