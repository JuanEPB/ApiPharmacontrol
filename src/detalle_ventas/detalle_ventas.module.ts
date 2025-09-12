// filepath: c:\api\api\src\detalle_ventas\detalle_ventas.module.ts
// ...existing code...
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVentasService } from './detalle_ventas.service';
import { DetalleVentasController } from './detalle_ventas.controller';
import { DetalleVenta } from './entities/detalle_venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta])],
  controllers: [DetalleVentasController],
  providers: [DetalleVentasService],
  exports: [DetalleVentasService],
})
export class DetalleVentasModule {}