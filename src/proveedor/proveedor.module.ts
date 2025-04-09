import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './entity/proveedor.entity';
import { Medicamentos } from 'src/products/entity/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicamentos, Proveedor])],
  providers: [ProveedorService],
  controllers: [ProveedorController]
})
export class ProveedorModule {}
