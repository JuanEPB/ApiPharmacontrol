import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Usuario } from 'src/users/entity/users.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
import { DocumentoService } from 'src/documento/documento.service';
import { HistorialExportacionService } from 'src/historial_exportacion/historial_exportacion.service';


@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,

    @InjectRepository(VentaDetalle)
    private detalleRepo: Repository<VentaDetalle>,

    @InjectRepository(Medicamentos)
    private medicamentoRepo: Repository<Medicamentos>,

    @InjectRepository(Usuario)            // <--- Inyectar repositorio de usuario
    private usuarioRepo: Repository<Usuario>,

    private readonly documentoService: DocumentoService,
    private readonly historialService: HistorialExportacionService,
  ) {}

  async crearVenta(createVentaDto: CreateVentaDto, usuario: Usuario) {
  // Obtener usuario completo con id desde la base de datos
  const usuarioCompleto = await this.usuarioRepo.findOneBy({ id: usuario.id });
  if (!usuarioCompleto) throw new NotFoundException('Usuario no encontrado');

  const detalles: VentaDetalle[] = [];

  for (const d of createVentaDto.detalles) {
    const medicamento = await this.medicamentoRepo.findOneBy({ id: d.medicamentoId });
    if (!medicamento) throw new NotFoundException('Medicamento no encontrado');
    if (medicamento.stock < d.cantidad) throw new NotFoundException(`Stock insuficiente para ${medicamento.nombre}`);

    medicamento.stock -= d.cantidad;
    await this.medicamentoRepo.save(medicamento);

    const detalle = this.detalleRepo.create({
      medicamento,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
    });

    detalles.push(detalle);
  }

  const venta = this.ventaRepo.create({
    usuario: usuarioCompleto, // usar el usuario con id completo
    total: createVentaDto.total,
    detalles,
  });

  const ventaGuardada = await this.ventaRepo.save(venta);

  const buffer = Buffer.from(JSON.stringify(ventaGuardada, null, 2));
  const doc = await this.documentoService.guardarDesdeBuffer(
    buffer,
    `venta_${ventaGuardada.id}.json`,
    'application/json',
    usuarioCompleto.nombre,
    'Registro de venta',
    'venta',
  );

  await this.historialService.registrar(usuarioCompleto, doc._id.toString());

  return ventaGuardada;
}

}