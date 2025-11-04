import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmacia } from './entities/farmacia.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { PlanService } from '../plan/plan.service';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { UpdateFarmaciaDto } from './dto/update-farmacia.dto';

@Injectable()
export class FarmaciaService {
  constructor(
    @InjectRepository(Farmacia)
    private readonly farmaciaRepo: Repository<Farmacia>,
    @InjectRepository(Empresa)
    private readonly empresaRepo: Repository<Empresa>,
    private readonly planService: PlanService,
  ) {}

  // Crear farmacia validando límite del plan
  async create(dto: CreateFarmaciaDto) {
    const { empresaId, nombre, direccion, telefono } = dto;

    const empresa = await this.empresaRepo.findOne({
      where: { id: empresaId },
      relations: ['plan', 'farmacias'],
    });
    if (!empresa) throw new NotFoundException('La empresa especificada no existe');

    if (!empresa.plan) {
      throw new BadRequestException('La empresa no tiene un plan activo asignado');
    }

    const plan = await this.planService.findOne(empresa.plan.id);
    if (!plan) throw new NotFoundException('El plan asociado a la empresa no fue encontrado');

    const limite = plan.limiteFarmacias ?? 1;
    const existentes = empresa.farmacias?.length ?? 0;
    if (existentes >= limite) {
      throw new BadRequestException(
        `El plan "${plan.nombre}" solo permite ${limite} farmacia(s).`,
      );
    }

    const nueva = this.farmaciaRepo.create({
      nombre,
      rfc: dto.rfc,
      direccion,
      telefono,
      email: dto.email,
      lema: dto.lema,
      logo_url: dto.logo_url,
      empresa, // ✅ pasa la entidad completa
      activo: true,
      fechaRegistro: new Date(),
      usuarios: [],
      ventas: [],
    });

    return this.farmaciaRepo.save(nueva);
  }

  // Listar todas o por empresa (query opcional)
  async findAll(empresaId?: number) {
    if (empresaId) {
      return this.farmaciaRepo.find({
        where: { empresa: { id: empresaId } }, // ✅ corregido
        relations: ['empresa'],
      });
    }
    return this.farmaciaRepo.find({ relations: ['empresa'] });
  }

  // Listar por empresa (endpoint dedicado)
  async findByEmpresa(empresaId: number) {
    const empresa = await this.empresaRepo.findOne({ where: { id: empresaId } });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');
    return this.farmaciaRepo.find({
      where: { empresa: { id: empresaId } }, // ✅ corregido
      relations: ['empresa'],
    });
  }

  // Obtener una
  async findOne(id: number) {
    const farmacia = await this.farmaciaRepo.findOne({
      where: { id },
      relations: ['empresa', 'empresa.plan'],
    });
    if (!farmacia) throw new NotFoundException('Farmacia no encontrada');
    return farmacia;
  }

  // Actualizar
  async update(id: number, dto: UpdateFarmaciaDto) {
    const farmacia = await this.findOne(id);
    Object.assign(farmacia, dto);
    return this.farmaciaRepo.save(farmacia);
  }

  // Eliminar
  async remove(id: number) {
    const farmacia = await this.findOne(id);
    return this.farmaciaRepo.remove(farmacia);
  }
}
