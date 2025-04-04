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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password:'',
      database:'pharmacontrol',
      entities: [Medicamentos,Proveedor, Categoria],
      synchronize: true,
    })
    ,ProductsModule, ProveedorModule, UsersModule, CategoriasModule, HistorialImportacionModule, HistorialExportacionModule],
  controllers: [AppController, HistorialImportacionController],
  providers: [AppService, HistorialImportacionService],
})
export class AppModule {}
