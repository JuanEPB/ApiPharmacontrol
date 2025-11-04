import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) {}

  findAll() {
    return this.planRepo.find();
  }

  findOne(id: number) {
    return this.planRepo.findOne({ where: { id } });
  }

  async createBasePlans() {
    const basePlans = [
      {
        nombre: 'Demo',
        precio_mensual: 0,
        limiteFarmacias: 1,
        limiteUsuarios: 1,
        limiteReportes: 10,
        limiteRegistros: 100,
        movil : false,
        IA: false, 
        periodo_prueba_dias: 15,
        nivel_soporte: 'Ninguno',
        descripcion: 'Plan gratuito de prueba por 15 días.',  
      },
      {
        nombre: 'Básico',
        precio_mensual: 6999.99,
        limiteFarmacias: 1,
        limiteUsuarios: 2,
        limiteReportes: 20,
        limiteRegistros: 300,
        movil: false,
        IA: true,
        periodo_prueba_dias: null,
        nivel_soporte: 'Email',
        descripcion: 'Ideal para pequeñas farmacias individuales.',
      },
      {
        nombre: 'Profesional',
        precio_mensual: 13999.99,
        limiteFarmacias: 3,
        limiteUsuarios: 5,
        limiteReportes: 1000,
        movil: true,
        IA: true,
        periodo_prueba_dias: null,
        limiteRegistros: 700,
        nivel_soporte: 'Chat y Email',
        descripcion: 'Para cadenas pequeñas o en expansión.',
      },
      {
        nombre: 'Premium',
        precio_mensual: 26999.99,
        limiteFarmacias: 10,
        limiteUsuarios: 100,
        limiteReportes: 2000,
        limiteRegistros: 2000,
        movil: true,
        IA: true,
        periodo_prueba_dias: null,
        nivel_soporte: 'Prioritario 24/7',
        descripcion: 'Empresas grandes con múltiples sedes.',
      },
    ];

    for (const plan of basePlans) {
      const exists = await this.planRepo.findOne({ where: { nombre: plan.nombre } });
      if (!exists) await this.planRepo.save(plan);
    }

    return this.findAll();
  }
}
