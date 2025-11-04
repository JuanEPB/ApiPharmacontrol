import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suscripcion } from './entities/suscripcion.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Plan } from '../plan/entities/plan.entity';
import { addDays } from 'date-fns';

@Injectable()
export class SuscripcionService {
  constructor(
    @InjectRepository(Suscripcion)
    private readonly suscripcionRepo: Repository<Suscripcion>,
    @InjectRepository(Empresa)
    private readonly empresaRepo: Repository<Empresa>,
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) {}

  async crearSuscripcionInicial(empresaId: number, planNombre: string) {
    const empresa = await this.empresaRepo.findOne({ where: { id: empresaId } });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');

    const plan = await this.planRepo.findOne({ where: { nombre: planNombre } });
    if (!plan) throw new NotFoundException('Plan no encontrado');

    const hoy = new Date();
    const fin = addDays(hoy, 30); // Plan demo o mensual

    const suscripcion = this.suscripcionRepo.create({
      empresa,
      plan,
      fecha_inicio: hoy,
      fecha_fin: fin,
      activa: true,
      monto_pagado: 0,
      estado_pago: 'pendiente',
    });

    const nueva = await this.suscripcionRepo.save(suscripcion);

    // Asigna el plan activo a la empresa
    empresa.plan = plan;
    await this.empresaRepo.save(empresa);

    return nueva;
  }

  async renovarSuscripcion(empresaId: number, dias: number) {
    const empresa = await this.empresaRepo.findOne({ where: { id: empresaId } });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');

    const activa = await this.suscripcionRepo.findOne({
      where: { empresa: { id: empresaId }, activa: true },
    });

    if (!activa) throw new NotFoundException('No hay suscripción activa');

    activa.fecha_fin = addDays(new Date(activa.fecha_fin), dias);
    await this.suscripcionRepo.save(activa);

    return activa;
  }

  async verificarSuscripcionesVencidas() {
    const hoy = new Date();
    const vencidas = await this.suscripcionRepo
      .createQueryBuilder('s')
      .where('s.fecha_fin < :hoy AND s.activa = true', { hoy })
      .getMany();

    for (const sub of vencidas) {
      sub.activa = false;
      await this.suscripcionRepo.save(sub);
    }

    return vencidas.length;
  }
}
