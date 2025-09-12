import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { LotesModule } from './lotes/lotes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DetalleVentasModule } from './detalle_ventas/detalle_ventas.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VentasModule } from './ventas/ventas.module';
import { DocumentoModule } from './documento/documento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'pharmacontrol',
      timezone: 'Z',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.TYPEORM_SYNC === 'true' ? true : false,
      logging: false,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmacontrol'),
    ProductosModule,
    LotesModule,
    CategoriasModule,
    DetalleVentasModule,
    MovimientosModule,
    ProveedoresModule,
    UsuariosModule,
    VentasModule,
    DocumentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}