import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionEmpresa } from './entities/configuracion.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { CreateConfiguracionDto } from './dto/create-configuracion.dto';
import { UpdateConfiguracionDto } from './dto/update-configuracion.dto';

@Injectable()
export class ConfiguracionService {
  constructor(
    @InjectRepository(ConfiguracionEmpresa)
    private readonly configRepo: Repository<ConfiguracionEmpresa>,
    @InjectRepository(Empresa)
    private readonly empresaRepo: Repository<Empresa>,
  ) {}

  async crear(dto: CreateConfiguracionDto) {
    const empresa = await this.empresaRepo.findOne({ where: { id: dto.empresa_id } });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');

    const existente = await this.configRepo.findOne({ where: { empresa: { id: empresa.id } } });
    if (existente) throw new NotFoundException('Esta empresa ya tiene una configuración creada');

    const nueva = this.configRepo.create({
      empresa,
      logo_url: dto.logo_url,
      lema: dto.lema,
      color_primario: dto.color_primario,
      color_secundario: dto.color_secundario,
      mostrar_marca: dto.mostrar_marca ?? true,
    });

    return this.configRepo.save(nueva);
  }

  async obtenerPorEmpresa(empresaId: number) {
    const config = await this.configRepo.findOne({
      where: { empresa: { id: empresaId } },
    });
    if (!config) throw new NotFoundException('Configuración no encontrada');
    return config;
  }

  async actualizar(id: number, dto: UpdateConfiguracionDto) {
    const config = await this.configRepo.findOne({ where: { id } });
    if (!config) throw new NotFoundException('Configuración no encontrada');

    Object.assign(config, dto);
    return this.configRepo.save(config);
  }
}
