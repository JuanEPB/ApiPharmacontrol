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



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pharmacontrol',), 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password:'',
      database:'pharmacontrol',
      entities: [Medicamentos,Proveedor, Categoria, Usuario, HistorialExportacion, Venta, VentaDetalle],
      synchronize: true,
    })
    ,ProductsModule, ProveedorModule, UsersModule, CategoriasModule, HistorialImportacionModule, HistorialExportacionModule, AuthModule, DocumentoModule, VentaModule],
  controllers: [AppController, HistorialImportacionController],
  providers: [AppService, HistorialImportacionService],
})
export class AppModule {}
