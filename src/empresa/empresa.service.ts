import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { Plan } from '../plan/entities/plan.entity';
import { Suscripcion } from '../suscripcion/entities/suscripcion.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepo: Repository<Empresa>,

    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,

    @InjectRepository(Suscripcion)
    private readonly suscripcionRepo: Repository<Suscripcion>,
  ) {}

  async findAll() {
    return await this.empresaRepo.find({ relations: ['plan', 'farmacias', 'suscripciones'] });
  }

  async findOne(id: number) {
    const empresa = await this.empresaRepo.findOne({
      where: { id },
      relations: ['plan', 'farmacias', 'suscripciones'],
    });
    if (!empresa) throw new NotFoundException(`Empresa con ID ${id} no encontrada`);
    return empresa;
  }

  async create(data: any) {
      if (!data || !data.planId) {
    throw new NotFoundException('Debe proporcionar un planId válido en el cuerpo de la solicitud');
  }
    
    const plan = await this.planRepo.findOne({ where: { id: data.planId } });
    if (!plan) throw new NotFoundException('Plan no encontrado');

    const empresa = this.empresaRepo.create({
      nombre: data.nombre,
      rfc: data.rfc,
      direccion: data.direccion || null,
      telefono_contacto: data.telefono_contacto || null,
      email_contacto: data.email_contacto || null,
      plan: plan, // ✅ corregido
      estado: 'activo',
      fecha_registro: new Date(),
    });

    // 🔹 Calcular expiración si el plan tiene periodo de prueba
    if (plan.periodo_prueba_dias && plan.nombre === 'Demo') {
      const finPrueba = new Date();
      finPrueba.setDate(finPrueba.getDate() + plan.periodo_prueba_dias);
      empresa.fecha_expiracion = finPrueba;
    } else {
      empresa.fecha_expiracion = data.fecha_expiracion || null;
    }

    // 🔹 Guardar empresa primero
    const savedEmpresa = await this.empresaRepo.save(empresa);

    // 🔹 Crear la suscripción asociada
    const suscripcion = this.suscripcionRepo.create({
      empresa: savedEmpresa,
      plan: plan, // ✅ corregido
      estado_pago: 'pendiente',
      activa: true,
      monto_pagado: 0,
      fecha_inicio: new Date(),
      fecha_fin: empresa.fecha_expiracion,
      creado_en: new Date(),
      actualizado_en: new Date(),
    });

    await this.suscripcionRepo.save(suscripcion);

    return { ...savedEmpresa, suscripcion };
  }

  async update(id: number, data: any) {
    const empresa = await this.findOne(id);
    Object.assign(empresa, data);
    return this.empresaRepo.save(empresa);
  }

  async remove(id: number) {
    const empresa = await this.findOne(id);
    return this.empresaRepo.remove(empresa);
  }

  async checkTrialStatus(id: number) {
    const empresa = await this.findOne(id);
    if (!empresa.fecha_expiracion) {
      return { enPrueba: false };
    }

    const hoy = new Date();
    const fin = new Date(empresa.fecha_expiracion);
    const enPrueba = hoy <= fin;
    const diasRestantes = enPrueba
      ? Math.ceil((fin.getTime() - hoy.getTime()) / (1000 * 3600 * 24))
      : 0;

    return {
      enPrueba,
      diasRestantes,
      fechaFin: fin.toISOString().split('T')[0],
    };
  }
}
