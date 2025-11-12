import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';

// ENTIDADES: usa los nombres/clases reales de tu proyecto
import { Pedido } from './entities/pedido.entity';
import { PedidoItem } from './entities/pedido-item.entity';

// Estas 3 debes importarlas con su NOMBRE REAL
import { Proveedor } from 'src/proveedor/entity/proveedor.entity';
import { Farmacia } from 'src/farmacia/entities/farmacia.entity';       // o FarmaciaEntity
import { Medicamentos } from 'src/products/entity/products.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      PedidoItem,
      Proveedor,     // cambia si tu clase es Proveedores
      Farmacia,      // cambia si tu clase se llama diferente
      Medicamentos,  // OJO: si tu clase es "Medicamentos" (plural), usa esta aquí
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  // (opcional) exports si otro módulo necesita estos repos
  exports: [TypeOrmModule, PedidosService],
})
export class PedidosModule {}
