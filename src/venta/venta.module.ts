import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { Medicamentos } from 'src/products/entity/products.entity';
import { DocumentoModule } from 'src/documento/documento.module';
import { HistorialExportacionModule } from 'src/historial_exportacion/historial_exportacion.module';
import { Usuario } from 'src/users/entity/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, VentaDetalle, Medicamentos, Usuario]),
    DocumentoModule,
    HistorialExportacionModule,
  ],
  controllers: [VentaController],
  providers: [VentaService],
  exports: [VentaService],
})
export class VentaModule {}