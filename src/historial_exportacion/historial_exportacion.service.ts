import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { HistorialExportacion } from './entity/historial_exportacion.entity';
import { Usuario } from 'src/users/entity/users.entity';

@Injectable()
export class HistorialExportacionService {
  constructor(
    @InjectRepository(HistorialExportacion)
    private historialRepo: Repository<HistorialExportacion>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async findAll(): Promise<HistorialExportacion[]> {
    return this.historialRepo.find({ relations: ['usuario'], order: { fecha: 'DESC' } });
  }

  async findOne(id: number): Promise<HistorialExportacion | null> {
    return this.historialRepo.findOne({ where: { id }, relations: ['usuario'] });
  }

  async findByFecha(fechaInicio: Date, fechaFin: Date): Promise<HistorialExportacion[]> {
    return this.historialRepo.find({
      where: {
        fecha: Between(fechaInicio, fechaFin),
      },
      relations: ['usuario'],
      order: { fecha: 'DESC' },
    });
  }

  async findByNombreUsuario(nombre: string): Promise<HistorialExportacion[]> {
    return this.historialRepo.find({
      relations: ['usuario'],
      where: {
        usuario: {
          nombre: Like(`%${nombre}%`),
        },
      },
      order: { fecha: 'DESC' },
    });
  }

  async findByUsuarioId(usuarioId: number): Promise<HistorialExportacion[]> {
    return this.historialRepo.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'],
      order: { fecha: 'DESC' },
    });
  }

  async findbyiddocumento(documentoId: string): Promise<HistorialExportacion[]> {
    return this.historialRepo.find({
      where: { documento: documentoId },
      relations: ['usuario'],
      order: { fecha: 'DESC' },
    });
  }

async registrar(usuario: Usuario, documentoId: string): Promise<HistorialExportacion> {
  const historial = new HistorialExportacion();
  historial.documento = documentoId;
  historial.usuario = { id: usuario.id } as Usuario;  // Solo el id para la relación

  console.log('Historial a guardar:', historial);

  return this.historialRepo.save(historial);
}


}
