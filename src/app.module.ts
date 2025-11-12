import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { HistorialImportacionController } from './historial_importacion/historial_importacion.controller';
import { HistorialImportacionService } from './historial_importacion/historial_importacion.service';
import { HistorialImportacionModule } from './historial_importacion/historial_importacion.module';
import { HistorialExportacionModule } from './historial_exportacion/historial_exportacion.module';
import { Medicamentos } from './products/entity/products.entity';
import { Proveedor } from './proveedor/entity/proveedor.entity';
import { Categoria } from './categorias/entity/categorias.entity';
import { Usuario } from './users/entity/users.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentoModule } from './documento/documento.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialExportacion } from './historial_exportacion/entity/historial_exportacion.entity';
import { VentaModule } from './venta/venta.module';
import { Venta } from './venta/entities/venta.entity';
import { VentaDetalle } from './venta/entities/venta_detalle.entity';
import { EmpresaModule } from './empresa/empresa.module';
import { PlanModule } from './plan/plan.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { FarmaciaModule } from './farmacia/farmacia.module';
import { Plan } from './plan/entities/plan.entity';
import { Suscripcion } from './suscripcion/entities/suscripcion.entity';
import { Farmacia } from './farmacia/entities/farmacia.entity';
import { Empresa } from './empresa/entities/empresa.entity';
import { PedidosModule } from './pedidos/pedidos.module';
import { Pedido } from './pedidos/entities/pedido.entity';
import { PedidoItem } from './pedidos/entities/pedido-item.entity';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://larts:yj7yZjRZIBMr3TJa@pharmacontrol.1aqn71v.mongodb.net/'),  
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
     type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Medicamentos,Proveedor, Categoria, Usuario, HistorialExportacion, Venta, VentaDetalle, Plan, Suscripcion, Farmacia, Empresa, Pedido, PedidoItem],
      synchronize: true,
    })
    ,ProductsModule, ProveedorModule, UsersModule, CategoriasModule, HistorialImportacionModule, HistorialExportacionModule, AuthModule, DocumentoModule, VentaModule, EmpresaModule, PlanModule, SuscripcionModule, ConfiguracionModule, FarmaciaModule, PedidosModule],
  controllers: [AppController, HistorialImportacionController],
  providers: [AppService, HistorialImportacionService],
})
export class AppModule {}
