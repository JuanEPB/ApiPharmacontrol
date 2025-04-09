import { Module } from '@nestjs/common';
import { MedicamentosService } from './products.service';
import { MedicamentosController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamentos } from './entity/products.entity';
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Categoria } from 'src/categorias/entity/categorias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicamentos, Proveedor, Categoria])],
  providers: [MedicamentosService],
  controllers: [MedicamentosController],
  exports: [ProductsModule]
})
export class ProductsModule {}
